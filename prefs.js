import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Vte from 'gi://Vte';
import GLib from 'gi://GLib';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class AutomaticFileBackupPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup({
            title: _('Automatic File/Folder backup via rsync'),
            description: _('Connection can be done with rsync daemon or rsynv via SSH'),
        });
        page.add(group);
        
        //Create new rows for the settings
        
        //Create and new entry row for the connection name
        const connection_name = new Adw.EntryRow({
            title: _('Enter Connection Name'),
            //show_apply_button : true,
        });
        group.add(connection_name);
        
        
        
        
        
        
        //Create and new entry row for the file/folder to backup
        const file_folder_name_row = new Adw.EntryRow({
            title: _('Enter the file/folder absolute path to monitor for backup'),
            //show_apply_button : true,
        });
        group.add(file_folder_name_row);
         
         
         
         
         
         
         
         
         
         //Create and new entry row for remote port
        const remote_port_row = new Adw.EntryRow({
            title: _('Enter remote port'),
            //show_apply_button : true,
        });
        group.add(remote_port_row);
        
        //Create and new entry row for remote folder/file
        const remote_folder_row = new Adw.EntryRow({
            title: _('Enter remote folder path (Do not start with /)'),
            //show_apply_button : true,
        });
        group.add(remote_folder_row);
        
         //Create and new entry row for remote address
        const remote_address_row = new Adw.EntryRow({
            title: _('Enter remote ip address'),
            //show_apply_button : true,
        });
        group.add(remote_address_row);
        
        //Create and new entry row for remote login
        const remote_login_name = new Adw.EntryRow({
            title: _('Enter remote login name'),
            //show_apply_button : true,
        });
        group.add(remote_login_name);
        
        // Create password required row
        
        const pass_switch = new Adw.SwitchRow({
            title: 'Use Password instead of key file'
        });
        group.add(pass_switch);
        
        // Create password row
        const pass_row = new Adw.PasswordEntryRow({
            title: _('Enter remote password '),
        });
        group.add(pass_row);
        
        const ssh_switch = new Adw.SwitchRow({
            title: 'Use rsynk daemon instead of rsync via ssh'
        });
        group.add(ssh_switch);
        
        
        //Create a action row with a button for first connection
        const FirstConnect = new Adw.ActionRow({ title: "Test rsync connection" });
        let ConnectButton = new Gtk.Button({ label: 'Connect', valign: Gtk.Align.CENTER });
        ConnectButton.connect('clicked', () => {
            // Open a terminal window
        
        // Import the settings
        const _settings = this.getSettings();
        
             /// Terminal Window ///
        let term_win = new Gtk.Window({
            title: 'Test rsync connection',
            modal: true,
            destroy_with_parent: true,
            resizable: false,
            default_height: 480,
            default_width: 640.
        });
        
        //Create a box in the window
        let _box = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
            halign: Gtk.Align.END,
            });
        term_win.child=_box;
        
        // Create a Terminal with the first command and attach it to the box
        
        
        const _TermCommand = ["/usr/bin/rsync", "--dry-run", "-vr" , _settings.get_string('host-path'),_settings.get_string('remote-login')+"@"+_settings.get_string('remote-address')+":"+_settings.get_string('remote-path') ];
        
        const _Pty = Vte.Pty.new_sync( Vte.PtyFlags.DEFAULT , null);
        _Pty.spawn_async(null, _TermCommand ,null, GLib.SpawnFlags.DEFAULT,null, -1, null, null );

        const _Terminal = new Vte.Terminal ({
            input_enabled: true,
            pty: _Pty,
            });
        _box.append(_Terminal);            
            
        term_win.present();
        
        }); // End of button clicked
        FirstConnect.add_suffix(ConnectButton);
        group.add(FirstConnect);
         
        
          // Import the settings
        const _settings = this.getSettings();
      
       // Create a settings object and bind the settings keys
      
       // Create a settings object and bind the host_port_row to the `host-port` key
        window._settings = this.getSettings();
        window._settings.bind('connection-name', connection_name, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('remote-port', remote_port_row, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        
        window._settings.bind('remote-path', remote_folder_row, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('host-path', file_folder_name_row, 'text',
            Gio.SettingsBindFlags.DEFAULT);    
            
        window._settings.bind('remote-address', remote_address_row, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('remote-login', remote_login_name, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('remote-password', pass_row, 'text',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('pass-required', pass_switch, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('use-rsync', ssh_switch, 'active',
            Gio.SettingsBindFlags.DEFAULT);
      
    };
};
