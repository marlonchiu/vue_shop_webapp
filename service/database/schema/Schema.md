# Mongoose的Schema建模介绍

数据库已经可以连接成功了，这节课学习一下如何建模，也就是定义Schema，他相当于MongoDB数据库的一个映射。Schema是一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力。Schema是以key-value形式Json格式的数据。

## Schema中的数据类型

* String ：字符串类型
* Number ：数字类型
* Date ： 日期类型
* Boolean： 布尔类型
* Buffer ： NodeJS buffer 类型
* ObjectID ： 主键,一种特殊而且非常重要的类型
* Mixed ：混合类型
* Array ：集合类型

## Mongoose中的三个概念

* schema ：用来定义表的模版，实现和MongoDB数据库的映射。用来实现每个字段的类型，长度，映射的字段，不具备表的操作能力。
* model ：具备某张表操作能力的一个集合，是mongoose的核心能力。我们说的模型就是这个Mondel。
* entity ：类似记录，由Model创建的实体，也具有影响数据库的操作能力。

## 载入所有Schema

glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
resolve: 将一系列路径或路径段解析为绝对路径
