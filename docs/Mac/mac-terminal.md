# Mac Battery Information with Terminal

Use the `system_profiler` command to view detailed information about your MacBook battery.

## Command

```bash
system_profiler SPPowerDataType
```

## What It Shows

The command reports details such as:

- Battery health
- Current charge level
- Cycle count
- Power and charging information

## Example

Run the command in **Terminal**, then look for the `Cycle Count` and `Condition` fields in the output.

Gives you detailed information about your MacBook’s battery status, including health, charge level, and cycle count.



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








