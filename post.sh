#!/usr/bin/env bash

# ------------------------------------------------------------------------------
#
# Program: initpost.sh
# Author: Vitor Britto
# Modified by: Gading Nasution.
# Description: script to create an initial structure for my posts.
#
# Usage: ./initpost.sh [options] <post name>
#
# Options:
#   -h, --help        output instructions
#   -c, --create      create post
#
# Alias: alias ipost="bash ~/path/to/script/initpost.sh"
#
# Example:
#   ./initpost.sh -c How to replace strings with sed
#
# Important Notes:
#   - This script was created to generate new markdown files for my blog.
#
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# | VARIABLES                                                                  |
# ------------------------------------------------------------------------------

# CORE: Do not change these lines
# ----------------------------------------------------------------
CURRENT_YEARMONTH="$(date +'%Y/%m')"
CURRENT_DATE="$(date +'%Y-%m-%d')"
# TIME=$(date +"%T")
# ----------------------------------------------------------------


# SETTINGS: your configuration goes here
# ----------------------------------------------------------------

# Set your destination folder
BINPATH=$(cd `dirname $0`; pwd)
SRCPATH="${BINPATH}/src"
POSTPATH="${SRCPATH}/contents/posts"
BLOGMEDIAPATH="${BINPATH}/public/media/blog"
RAND_NUM=$(node -e "console.log(~~(Math.random() * 8) + 0)")

if [[ "${1}" == "-c" || "${1}" == "--create" ]]; then
    POST_TITLE="${@:2:$(($#-1))}"
    POST_NAME="$(echo ${@:2:$(($#-1))} | sed -e 's/ /-/g' | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/")"
    DIST_FOLDER="$POSTPATH/en"
    FILE_NAME="${POST_NAME}.md"
    SLUG_NAME_EN="\"${POST_NAME}\""
    SLUG_NAME_ID="null"
fi

# Handle EN lang
if [[ "${2}" == "-en" ]]; then
    POST_TITLE="${@:3:$(($#-1))}"
    POST_NAME="$(echo ${@:3:$(($#-1))} | sed -e 's/ /-/g' | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/")"
    DIST_FOLDER="${POSTPATH}/en"
    FILE_NAME="${POST_NAME}.md"
    SLUG_NAME_EN="\"${POST_NAME}\""
    SLUG_NAME_ID="null"
fi

# Handle ID lang
if [[ "${2}" == "-id" ]]; then
    DIST_FOLDER="${POSTPATH}/id"
    POST_TITLE="${@:3:$(($#-1))}"
    POST_NAME="$(echo ${@:3:$(($#-1))} | sed -e 's/ /-/g' | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/")"
    FILE_NAME="${POST_NAME}.md"
    SLUG_NAME_EN="null"
    SLUG_NAME_ID="\"${POST_NAME}\""
fi

# ----------------------------------------------------------------



# ------------------------------------------------------------------------------
# | UTILS                                                                      |
# ------------------------------------------------------------------------------

# Header logging
e_header() {
    printf "$(tput setaf 38)→ %s$(tput sgr0)\n" "$@"
}

# Success logging
e_success() {
    printf "$(tput setaf 76)✔ %s$(tput sgr0)\n" "$@"
}

# Error logging
e_error() {
    printf "$(tput setaf 1)✖ %s$(tput sgr0)\n" "$@"
}

# Warning logging
e_warning() {
    printf "$(tput setaf 3)! %s$(tput sgr0)\n" "$@"
}



# ------------------------------------------------------------------------------
# | MAIN FUNCTIONS                                                             |
# ------------------------------------------------------------------------------

# Everybody need some help
initpost_help() {

cat <<EOT
------------------------------------------------------------------------------
INIT POST - A shortcut to create an initial structure for my posts.
------------------------------------------------------------------------------
Usage: ./post.sh [options] <post name>
Options:
    -h, --help        output instructions
    -c, --create      create post
Example:
    ./post.sh -c How to replace strings with sed
Important Notes:
    - This script was created to generate new text files to my blog.
Copyright (c) Vitor Britto './initpost.sh' (Modified by Sutan Nst.)
Licensed under the MIT license.
------------------------------------------------------------------------------
EOT

}

# Initial Content
initpost_content() {
    echo "---"
    echo "title: \"${POST_TITLE}\""
    echo "slug: {"
    echo -e "\ten: ${SLUG_NAME_EN},"
    echo -e "\tid: ${SLUG_NAME_ID}"
    echo "}"
    echo "date: ${CURRENT_DATE}"
    echo "description: \"An description\""
    echo "keywords: \"keyword, blog template\""
    echo "tags: [\"template\"]"
    echo "image: \"/media/banners/${RAND_NUM}.jpg\""
    echo "---"
    echo ""
    echo "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
}

# Create post
initpost_file() {
    if [ ! -f "$FILE_NAME" ]; then
        e_header "Creating template..."
        echo "dist: $DIST_FOLDER/$FILE_NAME"
        mkdir -p "${BLOGMEDIAPATH}/${POST_NAME}"
        initpost_content > "${DIST_FOLDER}/${FILE_NAME}"
        e_success "Initial post successfully created!"
    else
        e_warning "File already exist."
        exit 1
    fi

}

# ------------------------------------------------------------------------------
# | INITIALIZE PROGRAM                                                         |
# ------------------------------------------------------------------------------

main() {

    # Show help
    if [[ "${1}" == "-h" || "${1}" == "--help" ]]; then
        initpost_help ${1}
        exit
    fi

    # Create post
    if [[ "${1}" == "-c" || "${1}" == "--create" ]]; then
        initpost_file $*
        exit
    fi
}

# Initialize
main $*
