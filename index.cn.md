---
layout: page.cn
---

### Languages

* [English](/)

# TBOOX开源工程

* [TBOX](#tbox): 轻量级跨平台C开发库
* [GBOX](#gbox): 轻量级跨平台C图形库
* [XMake](#xmake): 轻量级跨平台自动构建工具

<div id="tbox"></div>

# 轻量级跨平台C开发库 (TBOX)

## 简介
TBOX是一个用c语言实现的多平台开发库，支持windows、linux、mac、ios、android以及其他嵌入式系统。

针对各个平台，封装了统一的接口，简化了各类开发过程中常用操作，使你在开发过程中，更加关注实际应用的开发，而不是把时间浪费在琐碎的接口兼容性上面，并且充分利用了各个平台独有的一些特性进行优化。

* [在线文档](https://github.com/waruqi/tbox/wiki/%E7%9B%AE%E5%BD%95)
* [在线源码](https://github.com/waruqi/tbox)

## 流库
针对http、file、socket、data等流数据，实现统一接口进行读写，并且支持: 阻塞、非阻塞、异步 三种读写模式。
支持中间增加多层filter流进行流过滤，实现边读取，内部边进行解压、编码转换、加密等操作，极大的减少了内存使用。 

主要提供以下特性：

1. stream：通用非阻塞流，用于一般的单独io处理。
2. async_stream：利用asio实现的纯异步流，基于回调模式，可同时处理大量并发io。
3. transfer：传输器，维护两路流的传输，对async_stream的使用进行更上层的封装，用其可以很方便的实现下载、上传、复制等io传输操作。
4. transfer_pool：传输池，基于asio，维护大量并发的传输，可以用于实现爬虫、批量下载等等。
5. static_stream：针对静态数据buffer优化的静态流，用于轻量快速的数据解析。

## asio库
1. 支持reactor和proactor两种模型，针对不同平台，采用epoll/poll/select/kqueue/iocp接口，最大化异步操作的性能。
2. 并且对http、ssl、dns也提供了纯异步模式的实现。基于此库完全可以很方便的写出一个高性能的小型服务器。

## 数据库
1. 统一并简化数据库操作接口，适配各种数据源，通过统一的url来自动连接打开支持的数据库，数据的枚举采用迭代器模型。
2. 目前支持sqlite3以及mysql两种关系型数据库，也可自定义扩展使用其他关系型数据库。

## xml库
1. 针对xml提供DOM和SAX两种解析模式，SAX方式采用外部迭代模式，灵活性和性能更高，并且可以选择指定路径，进行解析。
2. 解析过程完全基于stream，所以是高度流化的，可以实现边下载、边解压、边转码、边解析一条龙服务，使用较低的内存也可以解析大规模数据。
3. 提供xml writer以支持对xml生成

## 内存库
1. 参考linux内核内存管理机制的实现，并对其进行各种改造和优化，所实现的TBOX独有的一整套内存池管理架构。
2. 调试模式下，可以轻松检测并定位内存泄露、内存越界溢出、内存重叠覆盖等常见内存问题，并对整体内存的使用进行了统计和简要分析。
3. 针对大块数据、小块数据、字符串数据进行了充分的利用，避免了大量外部碎片和内部碎片的产生。分配操作进行了各种优化，96%的情况下，效率都是在O(1)。

## 容器库
1. 提供哈希、链表、数组、队列、堆栈、最小最大堆等常用容器。
2. 支持各种常用成员类型，在原有的容器期初上，其成员类型还可以完全自定义扩展。
3. 所有容器都支持迭代器操作。
4. 大部分容器都可以支持基于stream的序列化和反序列化操作。

## 算法库
1. 提供各种排序算法：冒泡排序、堆排序、快速排序、插入排序。
2. 提供各种查找算法：线性遍历、二分法搜索。
3. 提供各种遍历、删除、统计算法。
4. 以迭代器为接口，实现算法和容器的分离，类似stl，但是c实现的，更加轻量。

## 网络库
1. 实现http、cookies、dns解析与缓存、ipv4、url的封装。

## 数学运算库
1. 提供各种精度的定点运算支持
2. 提供随机数生成器

## libc库
1. libc的一个轻量级实现，完全跨平台，并且针对不同架构进行了优化。
2. 支持大部分字符串、宽字符串操作。
3. 扩展字符串、宽字符串的各种大小写不敏感操作接口
4. 扩展memset_u16、memset_u32等接口，并对其进行高度优化，尤其适合图形渲染程序

## libm库
1. libm部分接口的一个轻量级实现，以及对常用系统接口的封装。（目前只实现了部分，之后有时间会完全实现掉）
2. 扩展部分常用接口，增加对sqrt、log2等常用函数的整数版本计算，进行高度优化，不涉及浮点运算，适合嵌入式环境使用。

## object库
1. 轻量级类apple的CoreFoundation库，支持object、dictionary、array、string、number、date、data等常用对象，并且可以方便扩展自定义对象的序列化。
2. 支持对xml、json、binary以及apple的plist(xplist/bplist)格式序列化和反序列化。
并且实现自有的binary序列化格式， 针对明文进行了简单的加密，在不影响性能的前提下，序列化后的大小比bplist节省30%。

## 平台库
1. 提供file、directory、socket、thread、time等常用系统接口
2. 提供atomic、atomic64接口
3. 提供高精度、低精度定时器
4. 提供高性能的线程池操作
5. 提供event、mutex、semaphore、spinlock等事件、互斥、信号量、自旋锁操作
6. 提供获取函数堆栈信息的接口，方便调试和错误定位
7. 提供跨平台动态库加载接口（如果系统支持的话）

## 压缩库
1. 支持zlib/zlibraw/gzip的压缩与解压（需要第三方zlib库支持）。

## 字符编码库
1. 支持utf8、utf16、gbk、gb2312、uc2、uc4 之间的互相转码，并且支持大小端格式。

## 实用工具库
1. 实现base64/32编解码
2. 实现crc32、adler32、md5、sha1等常用hash算法
3. 实现日志输出、断言等辅助调试工具
4. 实现url编解码
5. 实现位操作相关接口，支持各种数据格式的解析，可以对8bits、16bits、32bits、64bits、float、double以及任意bits的字段进行解析操作，并且同时支持大端、小端和本地端模式，并针对部分操作进行了优化，像static_stream、stream都有相关接口对其进行了封装，方便在流上进行快速数据解析。
6. 实现swap16、swap32、swap64等位交换操作，并针对各个平台进行了优化。
7. 实现一些高级的位处理接口，例如：位0的快速统计、前导0和前导1的快速位计数、后导01的快速位计数
8. 实现单例模块，可以对静态对象、实例对象进行快速的单例封装，实现全局线程安全
9. 实现option模块，对命令行参数进行解析，提供快速方便的命令行选项建立和解析操作，对于写终端程序还是很有帮助的   

## 正则表达式库
1. 支持匹配和替换操作
2. 支持全局、多行、大小写不敏感等模式
3. 使用pcre, pcre2和posix正则库

## 一些使用tbox的项目：

* [gbox](https://github.com/waruqi/gbox)
* [itrace](https://github.com/waruqi/itrace)
* [更多项目](https://github.com/waruqi/tbox/wiki/%E4%BD%BF%E7%94%A8tbox%E7%9A%84%E5%BC%80%E6%BA%90%E5%BA%93)

## 编译 

请先安装: [xmake](https://github.com/waruqi/xmake)

    // 默认直接编译当前主机平台
    cd ./tbox
    xmake

    // 编译iphoneos平台
    cd ./tbox
    xmake f -p iphoneos 
    xmake
    
    // 编译android平台
    cd ./tbox
    xmake f -p android --ndk=xxxxx
    xmake

## 例子

    #include "tbox/tbox.h"

    int main(int argc, char** argv)
    {
        // init tbox
        if (!tb_init(tb_null, tb_null)) return 0;

        // trace
        tb_trace_i("hello tbox");

        // init vector
        tb_vector_ref_t vector = tb_vector_init(0, tb_element_cstr(tb_true));
        if (vector)
        {
            // insert item
            tb_vector_insert_tail(vector, "hello");
            tb_vector_insert_tail(vector, "tbox");

            // dump all items
            tb_for_all (tb_char_t const*, cstr, vector)
            {
                // trace
                tb_trace_i("%s", cstr);
            }

            // exit vector
            tb_vector_exit(vector);
        }

        // init stream
        tb_stream_ref_t stream = tb_stream_init_from_url("http://www.xxx.com/file.txt");
        if (stream)
        {
            // open stream
            if (tb_stream_open(stream))
            {
                // read line
                tb_long_t size = 0;
                tb_char_t line[TB_STREAM_BLOCK_MAXN];
                while ((size = tb_stream_bread_line(stream, line, sizeof(line))) >= 0)
                {
                    // trace
                    tb_trace_i("line: %s", line);
                }
            }

            // exit stream
            tb_stream_exit(stream);
        }

        // wait some time
        getchar();

        // exit tbox
        tb_exit();
        return 0;
    }

<div id="gbox"></div>

# 轻量级跨平台C图形库 (GBOX)

## 简介
GBOX是一个用c语言实现的多平台图形库，支持windows、linux、mac、ios、android以及其他嵌入式系统。

现在这个项目，正处于早期开发阶段，暂不提供使用，仅供参考学习

如果您感兴趣，可以阅读源码，目前已实现的功能：

1. 矢量2d渲染，支持矩阵变换，画刷、画笔的设置和渲染
2. 支持复杂矢量路径渲染和填充
3. 支持纯色填充、梯度填充、图像填充（正在重构）
4. 支持全定点或者浮点计算（可配置切换）
5. 实现渲染设备扩展，目前支持gpu加速的opengl es 1.0/2.0设备、纯算法渲染的bitmap设备
6. 实现复杂多边形分割（三角形分割、凸多边形分割），支持奇偶填充、非零填充等填充规则（这个算法花了我一年时间 =。=）
7. 实现mesh结构和封装
8. 实现多边形扫描算法
9. 支持多平台窗口扩展，目前支持glut、sdl窗口，后续会支持（x11，framebuffer, ios/android，windows等原生窗口）

后续工作：

1. svg矢量图形渲染（之前的版本实现过一整套，最近正在重构，所以暂时移除了）
2. 反走样支持
3. 实现更多平台窗口和渲染设备
4. 实现字体渲染
5. ui框架的实现
6. 有时间的话，再整整游戏引擎，当然这个是后话，看心情和时间了。

测试效果：

1. 目前基于opengl的渲染设备，绘制tiger.svg可达到60fps
2. 基于bitmap的纯算法渲染设备，绘制tiger.svg可达到30-40fps（pc上测试，数据仅供参考）

* [在线源码](https://github.com/waruqi/gbox)

<div id="xmake"></div>

# 轻量级跨平台自动构建工具 (XMake)

## 简介

XMake是一个跨平台自动构建工具，支持在各种主流平台上构建项目，类似cmake、automake、premake，但是更加的方便易用，工程描述语法更简洁直观，支持平台更多，并且集创建、配置、编译、打包、安装、卸载、运行于一体。

* [在线文档](https://github.com/waruqi/xmake/wiki/%E7%9B%AE%E5%BD%95)
* [在线源码](https://github.com/waruqi/xmake)

#### 支持特性

1. 支持windows、mac、linux、ios、android等平台，自动检测不同平台上的编译工具链（也可手动配置）
   编译windows项目采用原生vs的工具链，不需要使用cygwin、mingw（当然这些也支持）

2. 支持自定义平台编译配置，可以很方便的扩展第三方平台支持

3. 采用lua脚本语法描述项目，描述规则简单高效，逻辑规则可灵活修改，并且不会生成相关平台的工程文件，是工程更加简单明了

4. 支持创建模板工程、配置项目、编译项目、运行、打包、安装和卸载等常用功能（后续还会增加：自动生成文档、调试等模块）

5. 支持编译c/c++/objc/swift成静态库、动态库、命令行可执行程序（后续还会增加：mac、ios、android的app的生成规则）

6. 提供丰富的工程描述api，使用简单灵活，例如添加编译文件只需（还支持过滤排除）：

   `add_files("src/*.c", "src/asm/**.S", "src/*.m")`

7. 支持头文件、接口、链接库依赖、类型的自动检测，并可自动生成配置头文件config.h

8. 支持自定义编译配置开关，例如如果在工程描述文件中增加了enable_xxx的开关，那么配置编译的时候就可以手动进行配置来启用它：

   `xmake config --enable_xxx=true`

9. 提供一键打包功能，不管在哪个平台上进行打包，都只需要执行一条相同的命令，非常的方便

10. 支持自定义编译工具和规则，例如想要增加对masm/yasm的编译规则，只需将自己写的masm.lua/yasm.lua规则文件，放到当前项目目录下即可。。

11. 支持全局配置，一些常用的项目配置，例如工具链、规则描述等等，都可以进行全局配置，这样就不需要每次编译不同工程，都去配置一遍

12. 除了可以自动检测依赖模块，也支持手动强制配置模块，还有各种编译flags。

####简单例子

创建一个c++ console项目：

        xmake create -l c++ -t 1 console
     or xmake create --language=c++ --template=1 console

工程描述文件：xmake.lua

    add_target("console")
        set_kind("binary")
        add_files("src/*.c") 

配置工程：

   这个是可选的步骤，如果只想编译当前主机平台的项目，是可以不用配置的，默认编译release版本。
   当然每次配置都会被缓存，不需要每次全部重新配置。

       xmake f -p iphoneos -m debug
    or xmake f --ldflags="-Lxxx -lxxx"
    or xmake f --plat=macosx --arch=x86_64
    or xmake config --plat=iphoneos --mode=debug
    or xmake config --plat=iphonesimulator
    or xmake config --plat=android --arch=armv7-a --ndk=xxxxx
    or xmake config --cross=i386-mingw32- --toolchains=/xxx/bin
    or xmake config --cxflags="-Dxxx -Ixxx"
    or xmake config --help

编译工程：
 
       xmake
    or xmake -r
    or xmake --rebuild

运行目标：

       xmake r console
    or xmake run console

打包所有：

       xmake p
    or xmake p --archs="armv7, arm64"
    or xmake package
    or xmake package console
    or xmake package -o /tmp
    or xmake package --output=/tmp

安装目标：

       xmake i
    or xmake install
    or xmake install console
    or xmake install -o /tmp
    or xmake install --output=/tmp

详细使用方式和参数说明，请参考[文档](https://github.com/waruqi/xmake/wiki/%E7%9B%AE%E5%BD%95)
或者运行：

       xmake -h
    or xmake --help
    or xmake config --help
    or xmake package --help
    ...

也可以参考一些使用xmake的项目：

* [tbox](https://github.com/waruqi/tbox)
* [gbox](https://github.com/waruqi/gbox)
* [libsvx](https://github.com/caikelun/libsvx)
* [更多项目](https://github.com/waruqi/xmake/wiki/%E4%BD%BF%E7%94%A8xmake%E7%9A%84%E5%BC%80%E6%BA%90%E5%BA%93)

####后续工作

1. 完善打包模块，支持对ios、mac、android的app进行一键打包和签名，生成.ipa、.apk、.app、.deb、.rmp的应用和安装包文件
2. 完善安装功能，支持对ios、android的app进行安装到设备
3. 实现调试功能，实现在pc、ios、android等设备进行真机调试
4. 实现自动生成doxygen文档功能
5. 增加一些实用的工程描述api，例如：下载api，可以自动下载缺少的依赖库等等。。
6. 解析automake、cmake的工程，并自动生成xmake的描述文件，实现无缝编译（如果这个实现成功的话，以后移植编译一些开源代码就更方便了）
7. 实现插件化管理，可以扩展自己的命令、脚本、api、编译平台和工具链

####简单例子

    -- the debug mode
    if modes("debug") then
        
        -- enable the debug symbols
        set_symbols("debug")

        -- disable optimization
        set_optimize("none")
    end

    -- the release mode
    if modes("release") then

        -- set the symbols visibility: hidden
        set_symbols("hidden")

        -- enable fastest optimization
        set_optimize("fastest")

        -- strip all symbols
        set_strip("all")
    end

    -- add target
    add_target("test")

        -- set kind
        set_kind("static")

        -- add files
        add_files("src/*.c") 
