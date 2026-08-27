$root = $PSScriptRoot
foreach ($f in @('magaza.html','sepet.html','hesabim.html','recete-yukle.html','iletisim.html','homepage.html','hakkimizda.html')) {
    $path = Join-Path $root $f
    if (-not (Test-Path $path)) { Write-Host "$f : NOT FOUND"; continue }
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    # Check for mojibake patterns (UTF-8 bytes interpreted as Windows-1254)
    $hasMojibake = $content -match '[ÃÂ][\x80-\xBF]'
    $hasTurkish = $content -match '[\u0130\u0131\u011E\u011F\u00DC\u00FC\u015E\u015F\u00D6\u00F6\u00C7\u00E7]'
    Write-Host "$f : BOM=$hasBom Mojibake=$hasMojibake TurkishOK=$hasTurkish Size=$($bytes.Length)"
}
