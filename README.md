 1、 **安装`Node.js`**
 2、 **安装`MongoDB`**，
* 2.1、 把`MongoDB`安装路径下的`bin`文件目录，例如：`"C:\Program Files\MongoDB\Server\3.4\bin"`添加到系统环境变量，便可在命令窗口直接执行bin文件里面的命令；
* 2.2、 设置MongoDB数据库的数据存储路径，建议在C盘下创建`C:mongodb/data/db`目录文件夹，这是默认的数据存储路径，但需要手动创建，这样的话第3步的命令：`mongod`可直接执行；
 3、 启动`MongoDB`服务：`mongod`
* 3.1、 在命令窗口[cmd]执行命令：`mongod`，开启`MongoDB`服务，启动后请勿关闭窗口;
* 3.2、 再新开一个命令窗口[cmd]执行命令：`mongo`，就可以用命令来管理数据库，例如：数据的*增删改查*；
 4、 安装`bower`依赖：`bower install`
* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`bower install`；
5、 安装`npm`依赖：`npm install`
* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`npm install`；
 7、 启动项目入口文件：`node app.js`
* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`node app.js`；
 8、 浏览器查看效果
* 8.1  `http://localhost:3000`查看首页效果。
* 8.2  `http://localhost:3000/admin/list`列表页
* 8.3  `http://localhost:3000/admin/movie`后台录入页
