import { openSettings } from './rpc/configuration'

export default [{
  label: "Hip Note",
  submenu: [
      { label: "À propos", selector: "orderFrontStandardAboutPanel:" },
      { label: "Préférences", accelerator: "Command+,", click: () => openSettings()},
      { type: "separator" },
      { label: "Quitter", accelerator: "Command+Q", click: () => app.quit() }
  ]}, {
  label: "Modifier",
  submenu: [
      { label: "Annuler", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Rétablir", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Couper", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copier", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Coller", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Sélectionner tout", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]}
];