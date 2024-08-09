param([string]$targetPath);
$Replace = "cache-version-{0}" -f (Get-Date -format s)
(Get-Content -Path $targetPath) -replace 'cache-version-[^"]*',$Replace | Set-Content -Path $targetPath