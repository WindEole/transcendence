# !/bin/bash

# =========================   QUELQUES COULEURS   ========================= #
# 																			#
# avec echo : mettre -e pour activer les séquences d'échappement			#
# syntax : echo -e "\E[BOLD;COLOR1_TXT;COLOR2_FONDmDu texte vient ici."		#
# 																			#
#		COULEUR 	TXT 	FOND											#
#		noir 		30		40				noir='\033[30m'					#
#		rouge		31		41				rouge='\033[31m'				#
#		vert		32		42				vert='\033[32m'					#
#		jaune		33		43				jaune='\033[33m'				#
# 		bleu		34		44				bleu='\033[34m'					#
# 		magenta		35		45				magenta='\033[35m'				#
#		cyan		36		46				cyan='\033[36m'					#
# 		blanc		37		47				blanc='\033[37m'				#
# 																			#
# si on veut ajouter du gras, example : jaune='\033[1;33m'					#
# pour reset en couleur d'origine : tput sgr0 OU echo -ne \033[0m			#
# 																			#
# ========================================================================= #

# quand on installe quelque chose : vert !
# information : jaune !

# NODE
echo "\033[33mNode version ----------------------------------------------------\033[0m"
node -v
echo " "

# NPM
echo "\033[33mNpm version -----------------------------------------------------\033[0m"
n="9.6.3"
m=$(npm -v)
if [ $n != $m ]; then
	echo "\033[32mnpm install -g npm@9.6.3\033[0m"
	npm install -g npm@9.6.3
fi
npm -v
echo " "

# NPM CLEAR CACHE (sinon plein d'erreurs à la longue...)
echo "\033[33mClear npm cache pour éviter erreurs -----------------------------\033[0m"
echo "\033[32mnpm cache clean --force\033[0m"
npm cache clean --force
echo " "

# =================   PAS POUR FRONTEND   ================= #

# # NESTJS/CLI ATTENTION ne s'installe pas toujours correctement -> voir le pull nestjs/cli !!!
# echo "\033[33mInstall Nestjs Command-line Interface globally ------------------\033[0m"
# echo "\033[32mnpm install -g @nestjs/cli\033[0m"
# npm install -g @nestjs/cli
# echo " "

# # PROJET NESTJS
# echo "\033[33mCreation d'un projet nestjs--------------------------------------\033[0m"
# echo "\033[32mnest new pong_arena_backend\033[0m"
# nest new pong_arena_backend
# echo " "

# ========================================================= #

# CREATE REACTJS APPLICATION
echo "\033[33mCreation d'un projet reactjs-------------------------------------\033[0m"
echo "\033[32mnpm install create-react-app\033[0m"
npm install create-react-app
echo "\033[32mnpm install create-react-app\033[0m"
npx create-react-app pong_arena_frontend
echo " "

# ARBORESCENCE
echo "\033[33mPlacer le new projet à la racine de frontend---------------------\033[0m"
echo "\033[32mmv pong_arena_frontend/* .\033[0m"
mv pong_arena_frontend/* .
echo "\033[32mrm -rf pong_arena_frontend/\033[0m"
rm -rf pong_arena_frontend/
echo " "

# LANCER LE PROJET (on obtient alors le dossier dist (copie)) -> NON ! A faire dans la prochaine commande de docker-compose
# echo "\033[33mLancer le projet en mode developpement---------------------------\033[0m"
# echo "\033[32mnpm run start:dev\033[0m"
# npm run start:dev
# echo " "

exec "$@"