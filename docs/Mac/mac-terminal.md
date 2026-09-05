# Mac Terminal Commands

## Get battery information
Use the `system_profiler` command to view detailed information about your MacBook battery.

```bash
system_profiler SPPowerDataType
```



## Measure Folder Sizes Like a Pro

Use `du` to display the size of each item in the current folder:

```bash
du -sh *
```

## Find Large Files

Use `find` to search for files larger than 1 GB:

```bash
sudo find / -type f -size +1G 2>/dev/null
```








