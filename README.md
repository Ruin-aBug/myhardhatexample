# HardHat + Typescrip 项目

该项目是主要技术有 hardhat + typescript + waffle + mocha 的智能合约编写、测试和部署的初始化项目。

你可以在` contracts`目录中直接进行合约编写，然后在` deploy`目录编写部署文件即可。

项目具体使用方法:

1. clone 项目后直接运行

    ```shell
    yarn
    或
    npm install
    ```

2. 编写配置

    1. 在项目根目录新建` .env`文件，将` .env.example`中的内容拷贝进去，修改为自己的配置

        ```shell
        ETHERSCAN_API_KEY=##etherscan的API，用不到可以不填
        ROPSTEN_URL=## 所用的网络RPC URL
        PRIVATE_KEY= ## 钱包私钥
        ```

    2. hardhat.config.ts 配置文件

        这个文件是 hardhat 的主要配置文件，可进行 solidity 编译版本、网络、插件安装等等配置。


3. 合约编译

    hardhat 编译

    ```she
    yarn hardhat compile
    ```

4. 测试

    在` test`目录下编写相关测试用例后，运行

    ```shell
    yarn hardhat test
    ```

5. 合约部署

    这里使用的是 hardhat-deploy 插件进行合约部署，所以应该在`deploy`目录下编写相关部署文件，然后运行命令

    ```SHELL
    yarn hardhat deploy --network networkname --tags TagsName
    ```

    - --network：所要部署到的网络名称，如：mainnet、ropsten 等；
    - --tags：这是在 deploy 文件中进行指定的，可以看我的`packege.json`中 script 的 deploy 命令和 deploy 文件。

