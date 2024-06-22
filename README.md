[![Netlify Status](https://api.netlify.com/api/v1/badges/be2aea46-625a-4955-9de4-cfa4df666b98/deploy-status)](https://app.netlify.com/sites/yurii-panasiuk-resume-goit/deploys)

# Simple Web Server Setup

## Create a Simple Web Server - Linux

### Start a simple web server in the background
```
&>/dev/null python3 -m http.server &
```


#### Show process
```
pgrep -f "python3 -m http.server"
```
or
```
ps aux | grep "python3 -m http.server" | grep -v grep
```

#### Stop process
```
kill <ProcessID>
```

## Create a Simple Web Server - Windows
### Start a simple web server with a hidden window
```
Start-Process python -ArgumentList "-m http.server" -WindowStyle Hidden
```

#### Show process
```
Get-Process -Name python
```


#### Stop process by name
```
Stop-Process -Name python
```


#### Stop process by ID (replace <ProcessId> with the actual process ID)
```
Stop-Process -Id <ProcessId>
```


