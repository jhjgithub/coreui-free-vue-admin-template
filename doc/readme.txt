
1. to change vscode font of explorer:
https://www.bountysource.com/issues/28554290-allow-to-change-the-font-size-and-font-of-the-workbench

To change font families and sizes of the workbench, apart from installing plugin vscode-custom-css as referred above, another more direct way has been proofed to be workable (Tested on VS Code 1.32.3):

Search the file "workbench.main.css" in your disk, the proper file path might be "C:\Program Files\Microsoft VS Code\resources\app\out\vs\workbench\workbench.main.css";
Make a backup of the file;
Open the file and search for ".part>.content", there might be 4 matches, just modify the 1st match per your preference like .part>.content{font-size:14px; font-weight: bold; font-family: Iosevka Term Slab Medium, Consolas, Courier New, monospace;}" ;
Save this file and Restart Vs Code, Bingo :)
This solves changing font face, but not font size. The line heights are hard-coded. So when you reduce font size you'll just end up with lot of whitespace between lines.


C:\Users\정지호\AppData\Local\Programs\Microsoft VS Code\resources\app\out\vs\workbench\workbench.main.css
.part>.content
{ font-family: D2Coding, Courier New, Consolas, monospace; font-size: 16px; }


### API 서버 실행 방법:
E:\src\vue\json-server> json-server --watch db.json



