@echo off
setlocal EnableDelayedExpansion

set distDir="%~dp0..\dist"
set tscJsOut="..\dist\%1.js"
set prettyOut="%distDir%\%1.js"
set uglyOut="%distDir%\%1.min.js"
set esmUglyOut="%distDir%\%1.esm.min.js"

call tsc --project "%~dp0..\tsconfig.json" --outFile "!tscJsOut!"
copy /y "!tscJsOut!" "!tscJsOut!.temp" >nul
copy /y header.js "!prettyOut!" >nul
type "!tscJsOut!.temp" >> "!prettyOut!"

copy /y header.js "!uglyOut!" >nul
copy /y header.esm.js "!esmUglyOut!" >nul
for /F "tokens=* usebackq" %%f in (`uglifyjs --compress --mangle --  "!tscJsOut!.temp"`) do (
	echo %%f >> "!uglyOut!"
	echo %%f >> "!esmUglyOut!"
)

del /q "!tscJsOut!.temp"