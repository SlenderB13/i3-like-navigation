# Project to make gnome navigation easier as in i3

We are going to use gnome commands to manipulate workspaces and windows navigation + add some i3 default keybindings.

## 1. Set fixed workspaces (done)
gsettings set org.gnome.mutter dynamic-workspaces false
gsettings set org.gnome.desktop.wm.preferences num-workspaces 5
## 2. Set keybindings to switch workspaces (done)
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']"
## 3. Set keybindings to move apps to workspaces (done)
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-1 "['<Shift><Super>1']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-2 "['<Shift><Super>2']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-3 "['<Shift><Super>3']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-4 "['<Shift><Super>4']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-5 "['<Shift><Super>5']"
## 4. Set keybindings to cycle between windows/apps (to be added)
gsettings set org.gnome.desktop.wm.keybindings switch-windows "['<Control>l']"
gsettings set org.gnome.desktop.wm.keybindings switch-windows-backward "['<Control>h']"
## 5. Make it an extension (done)
## 6. Bonus: Maybe use gnome-shell for tiling?? (to be analyzed)
## 7. Bonus: Swaping Alt and Win (done)
gsettings set org.gnome.desktop.input-sources xkb-options "['altwin:swap_lalt_lwin']"
