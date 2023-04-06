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

# SUPPRIMER TOUS LES DOSSIERS / FICHIERS PRECEDEMMENT CREES
echo "\033[33mRemove files & repository ---------------------------------------\033[0m"
rm -rf dist/ node_modules/ prisma/ src/ test/ nest-cli.json package-lock.json package.json README.md tsconfig.build.json tsconfig.json .env .gitignore
echo " "

# REFAIRE UN PACKAGE.JSON
echo "\033[33mRename package_init.json ----------------------------------------\033[0m"
echo "\033[32mnpm cache clean --force\033[0m"
npm cache clean --force
echo "\033[32mnpm init\033[0m"
npm init
echo " "

exec "$@"