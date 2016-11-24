iplocal=$(ifconfig | grep 'inet addr' | awk '{print $2}' | cut -d ':' -f2 |grep -v 127)

mypage() {
	if [ "$1" = "-l" ]; then
		sleep 2;
		cd Documents/github/balazsorban44.github.io/pug/1-ESSENTIALS/;
    sed -i "2 s/balazsorban.com/$iplocal:8000/g" vars.pug
		cd ../../jekyll
    sed -i "2 s/balazsorban.com/$iplocal:8000/g" _config.yml
		cd ..
		atom
		cd ./jekyll
		jekyll serve --host 0.0.0.0
		cd ..

	elif [ "$1" = "-o" ]; then
		cd Documents/github/balazsorban44.github.io/pug/1-ESSENTIALS
		sed -i "2 s=http://.*:8000=http://balazsorban.com=g" vars.pug
		cd ../../jekyll
		sed -i "2 s=http://.*:8000=http://balazsorban.com=g" _config.yml
		cd ..
		atom
		cd ./jekyll
		jekyll serve --host 0.0.0.0
	elif [ "$1" = "-w" ]; then
		cd
		cd Documents/github/balazsorban44.github.io
    gulp watch
  elif [ "$1" = "-s" ]; then
		cd
		cd Documents/github/balazsorban44.github.io
    serve
	elif [ "$1" = "-h" ]; then
		echo "
	-l Use -l for local url path.
	-o Use -o for online url path.
					"
	else
		echo "	Please specify url path.
	For more help, use -h"
	fi
}
