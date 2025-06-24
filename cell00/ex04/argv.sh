if [$# -eq 0 ]; then
    echo "No arguments supplied"
else
    for i in "$1" "$2" "$3"
    do
            if [ -n "$1" ]; then
                echo "$1"
            fi
        done
fi