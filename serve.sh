# Set default port if not provided
: ${PORT:=3500}

# Use the $PORT variable in your command
serve dist -s -n -L --listen $PORT