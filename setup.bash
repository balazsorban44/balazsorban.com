iplocal=$(ifconfig | grep 'inet addr' | awk '{print $2}' | cut -d ':' -f2 |grep -v 127)
local(){
	sleep 4;
	cd ./.pug/1-ESSENTIALS/;
	sed -i '3 s=^//==; 2 s=^=//=' vars.jade;
	cd ../../jekyll;
	sed -i '3 s/^#//; 2 s/^/#/' _config.yml;
	jekyll serve --host 0.0.0.0;
	cd ..
}

online(){

	sleep 4;
	cd ./.pug/1-ESSENTIALS/;
	sed -i '2 s=^//==; 3 s=^=//=' vars.jade;
	cd ../../jekyll;
	sed -i '2 s/^#//; 3 s/^/#/' _config.yml;
	jekyll serve --host 0.0.0.0;
	cd ..
}

mypage () {

	vivaldi 192.168.1.4:8000 & cd Downloads/Prepros-linux-64&&./Prepros&cd;
	cd Documents/github/balazsorban44.github.io/;
	sleep 2;
	atom .;
	$1
}
