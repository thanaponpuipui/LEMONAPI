@echo off

set db=testlemon

set /P promp=Insert test data into database "%db%"[Y/n]?
if /I %promp% NEQ Y goto exit_without_execute

psql -f testData.sql %db%

goto end

:exit_without_execute
echo program end

:end
pause
