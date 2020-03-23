@echo off
REM setup lemon test database

set db=testlemon

psql -f lookup.sql %db%
echo create lookup table
psql -f new.sql %db%
echo create test table

echo insert tags and other column inside insertThai.txt
