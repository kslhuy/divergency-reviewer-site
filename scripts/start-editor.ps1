$ErrorActionPreference = 'Stop'
$editorRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $editorRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Please install Node.js 22 or newer, then open this launcher again.' }
if (-not (Test-Path -LiteralPath (Join-Path $editorRoot 'node_modules/parse5/package.json'))) {
    & npm.cmd ci --ignore-scripts --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
}
$editorUrl = 'http://127.0.0.1:4177'
$editorSession = $null
try { $editorSession = Invoke-RestMethod "$editorUrl/api/editor" -TimeoutSec 2 } catch {}
if ($editorSession -and ($editorSession.app -ne 'divergency-editor' -or $editorSession.root -ne $editorRoot)) {
    throw 'Port 4177 is already used by another project. Close its editor before opening this one.'
}
if (-not $editorSession) {
    $editorLogs = Join-Path $editorRoot '.editor-runtime'
    New-Item -ItemType Directory -Path $editorLogs -Force | Out-Null
    Start-Process -FilePath (Get-Command node).Source -ArgumentList ('"' + (Join-Path $PSScriptRoot 'editor-server.mjs') + '"') -WorkingDirectory $editorRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $editorLogs 'server.log') -RedirectStandardError (Join-Path $editorLogs 'server-error.log')
    for ($editorAttempt = 0; $editorAttempt -lt 30; $editorAttempt++) {
        Start-Sleep -Milliseconds 300
        try { $editorSession = Invoke-RestMethod "$editorUrl/api/editor" -TimeoutSec 1; break } catch {}
    }
    if (-not $editorSession -or $editorSession.app -ne 'divergency-editor' -or $editorSession.root -ne $editorRoot) { throw 'Editor could not start. Check .editor-runtime/server-error.log.' }
}
Start-Process "$editorUrl/#gameplay"
