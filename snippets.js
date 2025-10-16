const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');

function getPackagesUserDir() {
  const home = os.homedir();
  const appdata = process.env.APPDATA || '';
  const candidates = [
    path.join(home, 'Library', 'Application Support', 'Sublime Text', 'Packages', 'User'),
    path.join(appdata, 'Sublime Text', 'Packages', 'User'),
    path.join(home, '.config', 'sublime-text', 'Packages', 'User'),
    path.join(home, 'Library', 'Application Support', 'Sublime Text 3', 'Packages', 'User'),
    path.join(appdata, 'Sublime Text 3', 'Packages', 'User'),
    path.join(home, '.config', 'sublime-text-3', 'Packages', 'User')
  ];
  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch(e){}
  }
  return candidates[0];
}

function writeFileSafe(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const baseDir = path.join(getPackagesUserDir(), 'FiveM Ultra');
fs.mkdirSync(baseDir, { recursive: true });

const completions = { scope: 'source.lua', completions: [] };
function add(trigger, body){ completions.completions.push({ trigger, contents: body }); }

add('CreateThread', 'CreateThread(function()\\n\\t${1}\\nend)');
add('RegisterCommand', "RegisterCommand('${1:cmd}', function(source, args, raw)\\n\\t${2}\\nend, ${3:false})");
add('RegisterNetEvent', "RegisterNetEvent('${1:res:event}')\\nAddEventHandler('${1:res:event}', function(${2:...})\\n\\t${3}\\nend)");
add('TriggerClientEvent', "TriggerClientEvent('${1:res:event}', ${2:target}, ${3:args})");
add('TriggerServerEvent', "TriggerServerEvent('${1:res:event}', ${2:args})");
add('RegisterNUICallback', "RegisterNUICallback('${1:action}', function(data, cb)\\n\\t${2}\\n\\tcb(${3:true})\\nend)");
add('SendNUIMessage', "SendNUIMessage({ action='${1:action}', data=${2:{}} })");
add('SetNuiFocus', 'SetNuiFocus(${1:true}, ${2:true})');
add('Wait', 'Wait(${1:0})');
add('GetGameTimer', 'GetGameTimer()');
add('PlayerPedId', 'PlayerPedId()');
add('GetPlayerPed', 'GetPlayerPed(${1:playerId})');
add('GetEntityCoords', 'GetEntityCoords(${1:entity})');
add('SetEntityCoords', 'SetEntityCoords(${1:entity}, ${2:x}, ${3:y}, ${4:z}, ${5:false}, ${6:false}, ${7:false}, ${8:true})');
add('GetEntityHeading', 'GetEntityHeading(${1:entity})');
add('SetEntityHeading', 'SetEntityHeading(${1:entity}, ${2:heading})');
add('TaskGoStraightToCoord', 'TaskGoStraightToCoord(${1:ped}, ${2:x}, ${3:y}, ${4:z}, ${5:speed}, ${6:timeout}, ${7:heading}, ${8:dist})');
add('TaskStartScenarioInPlace', "TaskStartScenarioInPlace(${1:ped}, '${2:WORLD_HUMAN_STAND_MOBILE}', ${3:duration}, ${4:true})");
add('ClearPedTasks', 'ClearPedTasks(${1:ped})');
add('GiveWeaponToPed', "GiveWeaponToPed(${1:ped}, '${2:WEAPON_PISTOL}', ${3:250}, ${4:false}, ${5:true})");
add('SetPedArmour', 'SetPedArmour(${1:ped}, ${2:armour})');
add('vec3', 'vec3(${1:x}, ${2:y}, ${3:z})');
add('vec4', 'vec4(${1:x}, ${2:y}, ${3:z}, ${4:w})');
add('CreateVehicle', 'local veh = CreateVehicle(${1:model}, ${2:x}, ${3:y}, ${4:z}, ${5:heading}, ${6:true}, ${7:false})\\nSetVehicleOnGroundProperly(veh)\\nSetEntityAsMissionEntity(veh, true, true)');
add('DeleteEntity', 'if DoesEntityExist(${1:entity}) then DeleteEntity(${1:entity}) end');
add('GetVehiclePedIsIn', 'GetVehiclePedIsIn(${1:ped}, ${2:false})');
add('SetVehicleNumberPlateText', "SetVehicleNumberPlateText(${1:veh}, '${2:PLATE}')");
add('SetVehicleMod', 'SetVehicleMod(${1:veh}, ${2:modType}, ${3:modIndex}, ${4:customTires})');
add('ToggleVehicleMod', 'ToggleVehicleMod(${1:veh}, ${2:modType}, ${3:toggle})');
add('AddBlipForCoord', "local blip = AddBlipForCoord(${1:x}, ${2:y}, ${3:z})\\nSetBlipSprite(blip, ${4:1})\\nSetBlipColour(blip, ${5:1})\\nSetBlipScale(blip, ${6:0.8})\\nBeginTextCommandSetBlipName('STRING')\\nAddTextComponentString('${7:Label}')\\nEndTextCommandSetBlipName(blip)");
add('DrawMarker', 'DrawMarker(${1:type}, ${2:x}, ${3:y}, ${4:z}, 0.0,0.0,0.0, 0.0,0.0,0.0, ${5:sx}, ${6:sy}, ${7:sz}, ${8:r}, ${9:g}, ${10:b}, ${11:alpha}, ${12:false}, ${13:true}, 2, ${14:false}, nil, nil, ${15:false})');
add('ShowNotification', "BeginTextCommandThefeedPost('STRING')\\nAddTextComponentSubstringPlayerName('${1:Text}')\\nEndTextCommandThefeedPostTicker(${2:false}, ${3:false})");
add('NetworkGetNetworkIdFromEntity', 'NetworkGetNetworkIdFromEntity(${1:entity})');
add('NetworkGetEntityFromNetworkId', 'NetworkGetEntityFromNetworkId(${1:netId})');
add('StartShapeTestRay', 'StartShapeTestRay(${1:x1},${2:y1},${3:z1}, ${4:x2},${5:y2},${6:z2}, ${7:flags}, ${8:entity}, ${9:p8})');
add('GetShapeTestResult', 'GetShapeTestResult(${1:handle})');
add('lib.notify', "lib.notify({ title='${1:Title}', description='${2:Description}', type='${3:info}' })");
add('lib.progressBar', "if lib.progressBar({ duration=${1:2500}, label='${2:Working...}', useWhileDead=${3:false}, canCancel=${4:true} }) then ${5} end");
add('lib.inputDialog', "local input = lib.inputDialog('${1:Title}', { '${2:Field1}', '${3:Field2}' })");
add('lib.callback.register', "lib.callback.register('${1:res:cb}', function(source, ${2:args})\\n\\t${3}\\n\\treturn ${4:true}\\nend)");
add('lib.callback.await', "local result = lib.callback.await('${1:res:cb}', ${2:source}, ${3:args})");
add('ox_target:addBoxZone', "exports.ox_target:addBoxZone({ coords=vec3(${1:x},${2:y},${3:z}), size=vec3(${4:2.0},${5:2.0},${6:2.0}), rotation=${7:0.0}, debug=${8:false}, options={{ name='${9:id}', icon='${10:fa-solid fa-hand}', label='${11:Use}', onSelect=function(data)\\n\\t${12}\\nend }} })");
add('QBCore:GetCoreObject', "QBCore = exports['qb-core']:GetCoreObject()");
add('QBCore:CreateCallback', "QBCore.Functions.CreateCallback('${1:res:cb}', function(source, cb, ${2:args})\\n\\t${3}\\n\\tcb(${4:true})\\nend)");
add('QBCore:TriggerCallback', "QBCore.Functions.TriggerCallback('${1:res:cb}', function(${2:result})\\n\\t${3}\\nend, ${4:args})");
add('QBCore:GetPlayer', 'local Player = QBCore.Functions.GetPlayer(${1:src})');
add('QBCore:GetPlayerByCitizenId', "local Player = QBCore.Functions.GetPlayerByCitizenId('${1:cid}')");
add('QBCore:AddItem', "local Player = QBCore.Functions.GetPlayer(${1:src})\\nPlayer.Functions.AddItem('${2:item}', ${3:amount})");
add('QBCore:RemoveItem', "local Player = QBCore.Functions.GetPlayer(${1:src})\\nPlayer.Functions.RemoveItem('${2:item}', ${3:amount})");
add('QBCore:AddMoney', "local Player = QBCore.Functions.GetPlayer(${1:src})\\nPlayer.Functions.AddMoney('${2:cash}', ${3:amount}, '${4:reason}')");
add('QBCore:RemoveMoney', "local Player = QBCore.Functions.GetPlayer(${1:src})\\nPlayer.Functions.RemoveMoney('${2:cash}', ${3:amount}, '${4:reason}')");
add('QBCore:CreateUseableItem', "QBCore.Functions.CreateUseableItem('${1:item}', function(source, item)\\n\\t${2}\\nend)");
add('QBCore:Notify', "TriggerClientEvent('QBCore:Notify', ${1:src}, '${2:message}', '${3:primary}', ${4:5000})");
add('ESX:getSharedObject', "ESX = exports['es_extended']:getSharedObject()");
add('ESX:RegisterServerCallback', "ESX.RegisterServerCallback('${1:res:cb}', function(source, cb, ${2:args})\\n\\t${3}\\n\\tcb(${4:true})\\nend)");
add('ESX:TriggerServerCallback', "ESX.TriggerServerCallback('${1:res:cb}', function(${2:result})\\n\\t${3}\\nend, ${4:args})");
add('ESX:GetPlayerFromId', 'local xPlayer = ESX.GetPlayerFromId(${1:source})');
add('ESX:addInventoryItem', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.addInventoryItem('${2:item}', ${3:count})");
add('ESX:removeInventoryItem', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.removeInventoryItem('${2:item}', ${3:count})");
add('ESX:addMoney', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.addMoney(${2:amount})");
add('ESX:removeMoney', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.removeMoney(${2:amount})");
add('ESX:addAccountMoney', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.addAccountMoney('${2:bank}', ${3:amount})");
add('ESX:removeAccountMoney', "local xPlayer = ESX.GetPlayerFromId(${1:source})\\nxPlayer.removeAccountMoney('${2:bank}', ${3:amount})");
add('esx:showNotification', "TriggerClientEvent('esx:showNotification', ${1:src}, '${2:Text}')");
add('ox_inventory:AddItem', "exports.ox_inventory:AddItem(${1:source}, '${2:item}', ${3:count}, ${4:metadata})");
add('ox_inventory:RemoveItem', "exports.ox_inventory:RemoveItem(${1:source}, '${2:item}', ${3:count}, ${4:metadata})");
add('ox_inventory:CanCarryItem', "exports.ox_inventory:CanCarryItem(${1:source}, '${2:item}', ${3:count})");
add('ox_inventory:RegisterItem', "exports.ox_inventory:RegisterItem('${1:item}', function(${2:src}, item, ${3:metadata})\\n\\t${4}\\nend)");
add('fxmanifest.lua', "fx_version 'cerulean'\\ngame 'gta5'\\n\\nauthor '${1:byAlex}'\\ndescription '${2:Resource}'\\nversion '${3:1.0.0}'\\n\\nshared_scripts {\\n\\t'@ox_lib/init.lua',\\n\\t'shared/*.lua'\\n}\\n\\nserver_scripts {\\n\\t'@mysql-async/lib/MySQL.lua',\\n\\t'server/*.lua'\\n}\\n\\nclient_scripts {\\n\\t'client/*.lua'\\n}\\n\\nlua54 '${4:yes}'");
add('Animation:TaskPlayAnim', "TaskPlayAnim(${1:ped}, '${2:dict}', '${3:name}', ${4:speed}, ${5:speedMult}, ${6:duration}, ${7:flag}, ${8:playbackRate}, ${9:lockX}, ${10:lockY}, ${11:lockZ})");
add('RequestAnimDict', "RequestAnimDict('${1:dict}')\\nwhile not HasAnimDictLoaded('${1:dict}') do Wait(0) end");
add('RequestModel', "local m = ${1:`${2:model}`}\\nif not IsModelValid(m) then return end\\nRequestModel(m)\\nwhile not HasModelLoaded(m) do Wait(0) end");
add('RequestModelHash', "RequestModel(${1:model})\\nwhile not HasModelLoaded(${1:model}) do Wait(0) end");
add('CreateObject', "CreateObject(${1:model}, ${2:x}, ${3:y}, ${4:z}, ${5:true}, ${6:true}, ${7:false})");
add('AttachEntityToEntity', "AttachEntityToEntity(${1:entity1}, ${2:entity2}, ${3:bones}, ${4:x}, ${5:y}, ${6:z}, ${7:rx}, ${8:ry}, ${9:rz}, ${10:false}, ${11:false}, ${12:false}, ${13:false}, ${14:2}, ${15:true})");
add('FreezeEntityPosition', "FreezeEntityPosition(${1:entity}, ${2:state})");
add('SetEntityInvincible', "SetEntityInvincible(${1:entity}, ${2:state})");
add('SetEntityVisible', "SetEntityVisible(${1:entity}, ${2:state}, ${3:false})");
add('DoScreenFadeOut', "DoScreenFadeOut(${1:500})");
add('DoScreenFadeIn', "DoScreenFadeIn(${1:500})");
add('DisplayRadar', "DisplayRadar(${1:bool})");
add('SetEntityHealth', "SetEntityHealth(${1:entity}, ${2:health})");
add('GetEntityHealth', "GetEntityHealth(${1:entity})");
add('SetPedArmour', "SetPedArmour(${1:ped}, ${2:value})");
add('ApplyForceToEntity', "ApplyForceToEntity(${1:entity}, ${2:forceType}, ${3:fx}, ${4:fy}, ${5:fz}, ${6:rx}, ${7:ry}, ${8:rz}, ${9:bRel}, ${10:highForce}, ${11:strong}, ${12:scale}, ${13:trigger})");
add('SetPedIntoVehicle', "SetPedIntoVehicle(${1:ped}, ${2:veh}, ${3:seat})");
add('TaskWarpPedIntoVehicle', "TaskWarpPedIntoVehicle(${1:ped}, ${2:veh}, ${3:seat})");
add('TaskLeaveVehicle', "TaskLeaveVehicle(${1:ped}, ${2:veh}, ${3:flags})");
add('TaskVehicleDriveToCoord', "TaskVehicleDriveToCoord(${1:ped}, ${2:veh}, ${3:x}, ${4:y}, ${5:z}, ${6:speed}, ${7:driveStyle}, ${8:stoppingRange})");

writeFileSafe(path.join(baseDir, 'FiveM-Ultra.sublime-completions'), JSON.stringify(completions, null, 2));

const snippets = {
  'fxmanifest.sublime-snippet': `<snippet>
<content><![CDATA[
fx_version 'cerulean'
game 'gta5'

author '\${1:byAlex}'
description '\${2:Resource}'
version '\${3:1.0.0}'

shared_scripts {
\t'@ox_lib/init.lua',
\t'shared/*.lua'
}

server_scripts {
\t'@mysql-async/lib/MySQL.lua',
\t'server/*.lua'
}

client_scripts {
\t'client/*.lua'
}

lua54 '\${4:yes}'
]]></content>
<tabTrigger>fxm</tabTrigger>
<scope>source.lua</scope>
<description>fxmanifest.lua skeleton</description>
</snippet>`,
  'qbcallback.sublime-snippet': `<snippet>
<content><![CDATA[
QBCore.Functions.CreateCallback('\${1:res:cb}', function(source, cb, \${2:args})
\t\${3}
\tcb(\${4:true})
end)
]]></content>
<tabTrigger>qbccb</tabTrigger>
<scope>source.lua</scope>
<description>QBCore CreateCallback</description>
</snippet>`,
  'esxcallback.sublime-snippet': `<snippet>
<content><![CDATA[
ESX.RegisterServerCallback('\${1:res:cb}', function(source, cb, \${2:args})
\t\${3}
\tcb(\${4:true})
end)
]]></content>
<tabTrigger>esxcb</tabTrigger>
<scope>source.lua</scope>
<description>ESX RegisterServerCallback</description>
</snippet>`,
  'nuicb.sublime-snippet': `<snippet>
<content><![CDATA[
RegisterNUICallback('\${1:action}', function(data, cb)
\t\${2}
\tcb(\${3:true})
end)
]]></content>
<tabTrigger>nuicb</tabTrigger>
<scope>source.lua</scope>
<description>RegisterNUICallback</description>
</snippet>`
};

for (const [file, xml] of Object.entries(snippets)) {
  writeFileSafe(path.join(baseDir, file), xml);
}

console.log('Installed to:', baseDir);

try {
  if (process.platform === 'darwin') cp.spawn('open', [baseDir], { detached: true, stdio: 'ignore' }).unref();
  else if (process.platform === 'win32') cp.spawn('cmd', ['/c', 'start', '', baseDir], { detached: true, stdio: 'ignore' }).unref();
  else cp.spawn('xdg-open', [baseDir], { detached: true, stdio: 'ignore' }).unref();
} catch(e){}
