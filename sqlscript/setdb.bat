@echo off
REM setup lemon test database

set db=testlemon

echo all of the data in "%db%" will be delete!
set /P promp=Are you sure you want to continue[Y/n]?
if /I %promp% NEQ Y goto exit_without_execute

psql -f testDrop.sql %db%

psql -f lookup.sql %db%
echo create lookup table
psql -f new.sql %db%
echo create test table

echo insert tags and other column inside insertThai.txt
goto end

:exit_without_execute
echo program end without reset the database

:end
exit 0
