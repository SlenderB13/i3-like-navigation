/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio';

// GSettings Schemas and Keys
const WorkspacesKey = 'num-workspaces';
const WorkspacesSchema = 'org.gnome.desktop.wm.preferences';
const DynamicKey = 'dynamic-workspaces';
const DynamicSchema = 'org.gnome.mutter';
const KeybindingsSchema = 'org.gnome.desktop.wm.keybindings';
const GSettings = Gio.Settings

// Key Swap Schema
const InputSourcesSchema = 'org.gnome.desktop.input-sources';
const XkbOptionsKey = 'xkb-options';
const SwapOption = 'altwin:swap_lalt_lwin';

// Keybindings to be set
const keysToSet = {
    // Toggle Fullscreen
    'toggle-maximized': ['<Super>f'],
    // Close window
    'close': ['<Shift><Super>q'],
    
    // Workspace Switching/Moving
    'switch-to-workspace-1': ['<Super>1'],
    'switch-to-workspace-2': ['<Super>2'],
    'switch-to-workspace-3': ['<Super>3'],
    'switch-to-workspace-4': ['<Super>4'],
    'switch-to-workspace-5': ['<Super>5'],
    'move-to-workspace-1': ['<Shift><Super>1'],
    'move-to-workspace-2': ['<Shift><Super>2'],
    'move-to-workspace-3': ['<Shift><Super>3'],
    'move-to-workspace-4': ['<Shift><Super>4'],
    'move-to-workspace-5': ['<Shift><Super>5']
};

export default class FixedWorkspacesExtension extends Extension {

    constructor(metadata) {
        super(metadata);
        this._originalDynamicSetting = null;
        this._originalXkbOptions = null;
    }

    enable() {
        this._workspaceSettings = new GSettings({ schema: WorkspacesSchema });
        this._mutterSettings = new GSettings({ schema: DynamicSchema });
        this._keybindingsSettings = new GSettings({ schema: KeybindingsSchema });
        this._inputSettings = new GSettings({ schema: InputSourcesSchema });

        // 1. SET KEY SWAP (Alt <-> Super)
        this._originalXkbOptions = this._inputSettings.get_strv(XkbOptionsKey);
        
        let newXkbOptions = [...this._originalXkbOptions];
        if (!newXkbOptions.includes(SwapOption)) {
            newXkbOptions.push(SwapOption);
        }
        this._inputSettings.set_strv(XkbOptionsKey, newXkbOptions);

        // 2. SET STATIC WORKSPACES
        this._originalDynamicSetting = this._mutterSettings.get_boolean(DynamicKey);
        this._mutterSettings.set_boolean(DynamicKey, false);
        this._workspaceSettings.set_int(WorkspacesKey, 5);

        // 3. SET CUSTOM KEYBINDINGS (Includes the new 'toggle-fullscreen' binding)
        for (const [key, value] of Object.entries(keysToSet)) {
            this._keybindingsSettings.set_strv(key, value);
        }

        console.log(`[${this.uuid}] Fixed Workspaces Extension enabled with Alt/Super swap, Close, and Fullscreen bindings.`);
    }

    disable() {
        // 1. RESTORE KEY SWAP
        if (this._originalXkbOptions !== null) {
            let restoredOptions = this._originalXkbOptions.filter(option => option !== SwapOption);
            this._inputSettings.set_strv(XkbOptionsKey, restoredOptions);
        }

        // 2. RESTORE DYNAMIC WORKSPACES
        if (this._originalDynamicSetting !== null) {
            this._mutterSettings.set_boolean(DynamicKey, this._originalDynamicSetting);
        }

        // 3. CLEAR CUSTOM KEYBINDINGS
        for (const key of Object.keys(keysToSet)) {
            this._keybindingsSettings.set_strv(key, []);
        }

        // Clean up settings objects
        this._workspaceSettings = null;
        this._mutterSettings = null;
        this._keybindingsSettings = null;
        this._inputSettings = null;

        console.log(`[${this.uuid}] Fixed Workspaces Extension disabled.`);
    }
}
