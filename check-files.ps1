$files = @('storefront.css','gutenberg-blocks.css','wc-blocks.css','icons.css','woocommerce.css','brands.css','visioncraft.css','visioncraft.js')
foreach ($f in $files) {
    try {
        $r = Invoke-WebRequest -Uri "https://aydemirensar.github.io/optik-demo/code/$f" -UseBasicParsing -Method Head
        Write-Host "$f : $($r.StatusCode)"
    } catch {
        Write-Host "$f : $($_.Exception.Response.StatusCode)"
    }
}
