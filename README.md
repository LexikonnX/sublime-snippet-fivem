
# FiveM Ultra Snippets — Sublime Text Installer

This repository contains a single Node.js script that creates and installs a Sublime Text package named **“FiveM Ultra”** into your **User** packages folder. The package provides one `.sublime-completions` file with many ready‑to‑use completions plus four individual `.sublime-snippet` files.

The completions and snippets target **FiveM (Lua)** development and include helpers for **core FiveM natives**, **QBCore**, **ESX**, **ox_lib**, **ox_target**, and **ox_inventory**.

---

## What the installer does

When you run `install_fivem_ultra_snippets.js`, it will:

1. Detect your Sublime Text *User* packages directory (supports macOS, Windows, Linux; Sublime Text 4 and 3).
2. Create a folder: `FiveM Ultra`.
3. Write these files into that folder:
   - `FiveM-Ultra.sublime-completions` (the main completions file)
   - `fxmanifest.sublime-snippet`
   - `qbcallback.sublime-snippet`
   - `esxcallback.sublime-snippet`
   - `nuicb.sublime-snippet`
4. Open the created folder in your file manager (Finder / Explorer).
5. You then restart Sublime Text to enable the completions/snippets.

> The installer does not modify any other files.

---

## Requirements

- Node.js 18 or newer (checked by running `node -v`)
- Sublime Text 4 (or 3)

---

## How to install

### macOS
1. Download `install_fivem_ultra_snippets.js` to any folder.
2. Open **Terminal** in that folder and run:
   ```bash
   node install_fivem_ultra_snippets.js
   ```
3. The script creates:
   ```
   ~/Library/Application Support/Sublime Text/Packages/User/FiveM Ultra/
   ```
   (for Sublime Text 3 it uses `Sublime Text 3` in the path)
4. Restart Sublime Text.

### Windows
1. Download `install_fivem_ultra_snippets.js` to any folder.
2. Open **Command Prompt** in that folder and run:
   ```bat
   node install_fivem_ultra_snippets.js
   ```
3. The script creates (Sublime Text 4):
   ```
   %AppData%\Sublime Text\Packages\User\FiveM Ultra\
   ```
   or (Sublime Text 3):
   ```
   %AppData%\Sublime Text 3\Packages\User\FiveM Ultra\
   ```
4. Restart Sublime Text.

> On Linux the script targets `~/.config/sublime-text/Packages/User/FiveM Ultra/` (or `sublime-text-3`).

---

## What’s included

### Completions file
`FiveM-Ultra.sublime-completions` defines many triggers. Examples (all of these are included exactly as triggers):

- Core / NUI / Events: `CreateThread`, `RegisterCommand`, `RegisterNetEvent`, `TriggerClientEvent`, `TriggerServerEvent`, `RegisterNUICallback`, `SendNUIMessage`, `SetNuiFocus`, `Wait`, `GetGameTimer`
- Entities / Vectors: `PlayerPedId`, `GetPlayerPed`, `vec3`, `vec4`, `GetEntityCoords`, `SetEntityCoords`, `GetEntityHeading`, `SetEntityHeading`, `DeleteEntity`
- Vehicles: `CreateVehicle`, `GetVehiclePedIsIn`, `SetVehicleNumberPlateText`, `SetVehicleMod`, `ToggleVehicleMod`
- UI / Blips / Markers: `AddBlipForCoord`, `DrawMarker`, `ShowNotification`
- Raycast / Network: `StartShapeTestRay`, `GetShapeTestResult`, `NetworkGetNetworkIdFromEntity`, `NetworkGetEntityFromNetworkId`
- Animations / Models / Objects: `Animation:TaskPlayAnim`, `RequestAnimDict`, `RequestModel`, `RequestModelHash`, `CreateObject`, `AttachEntityToEntity`
- Entity helpers: `FreezeEntityPosition`, `SetEntityInvincible`, `SetEntityVisible`, `DoScreenFadeOut`, `DoScreenFadeIn`, `DisplayRadar`, `SetEntityHealth`, `GetEntityHealth`, `ApplyForceToEntity`, `SetPedIntoVehicle`, `TaskWarpPedIntoVehicle`, `TaskLeaveVehicle`, `TaskVehicleDriveToCoord`
- ox_lib: `lib.notify`, `lib.progressBar`, `lib.inputDialog`, `lib.callback.register`, `lib.callback.await`
- ox_target: `ox_target:addBoxZone`
- QBCore: `QBCore:GetCoreObject`, `QBCore:CreateCallback`, `QBCore:TriggerCallback`, `QBCore:GetPlayer`, `QBCore:GetPlayerByCitizenId`, `QBCore:AddItem`, `QBCore:RemoveItem`, `QBCore:AddMoney`, `QBCore:RemoveMoney`, `QBCore:CreateUseableItem`, `QBCore:Notify`
- ESX: `ESX:getSharedObject`, `ESX:RegisterServerCallback`, `ESX:TriggerServerCallback`, `ESX:GetPlayerFromId`, `ESX:addInventoryItem`, `ESX:removeInventoryItem`, `ESX:addMoney`, `ESX:removeMoney`, `ESX:addAccountMoney`, `ESX:removeAccountMoney`, `esx:showNotification`
- ox_inventory: `ox_inventory:AddItem`, `ox_inventory:RemoveItem`, `ox_inventory:CanCarryItem`, `ox_inventory:RegisterItem`
- fxmanifest helper: `fxmanifest.lua`

> Each completion expands into a Lua code template with tab‑stops.

### Snippet files
The installer also writes these four snippet files with tab triggers:
- `fxmanifest.sublime-snippet` → trigger `fxm`
- `qbcallback.sublime-snippet` → trigger `qbccb`
- `esxcallback.sublime-snippet` → trigger `esxcb`
- `nuicb.sublime-snippet` → trigger `nuicb`

---

## Uninstall

Delete the folder:
- macOS: `~/Library/Application Support/Sublime Text/Packages/User/FiveM Ultra/`
- Windows: `%AppData%\Sublime Text\Packages\User\FiveM Ultra\` (or `Sublime Text 3`)
- Linux: `~/.config/sublime-text/Packages/User/FiveM Ultra/` (or `sublime-text-3`)

Restart Sublime Text.

---

## Notes

- The installer only creates files inside `FiveM Ultra` and opens that folder. It does not alter your other packages.
- If Sublime Text is open, restart it after running the installer so the new completions/snippets are loaded.
