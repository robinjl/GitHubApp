# GitHubApp

[慕课网 - 新版 React Native 从入门到实战打造高质量上线 App（再升级）](https://coding.imooc.com/learn/list/304.html)

## Concepts

1. DAO Data Access Object 数据访问对象

## Issues

1. dispatch is not a function  
   正确写法：

   ```
   mapDispatchToProps = dispatch => {
     return {
       todo: dispatch(todo)
     }
   }
   ```

   错误写法：

   ```
   mapDispatchToProps = dispatch => ({
     todo: dispatch(todo)
   })
   ```

2. Invariant Violation: Tried to get frame for out of range index NaN  
   FlatList data 不是 array

3. FlatList onEndReached 调用两次的问题解决
   在 onEndReached 及 onMomentumScrollBegin 中增加标识判断  
   同时为了确保 onEndReached 在 onMomentumScrollBegin 之后执行，在 onEndReached 中加入了 setTimeout，经验值 100ms  
   issue [FlatList onEndReached triggered 2 times](https://github.com/facebook/react-native/issues/14015)

4. 点击 mask 关闭 TrendingDialog 有抖动闪烁问题  
   这是因为 Debug 包动画执行的比较慢，release 之后会好

## Chapter

1. 第 7 章
   初次加载不显示数据 待解决    
   FlatList 分页加载优化

2. 第 8 章
   【8-10】Android 物理返回键

3. 第 9 章 收藏模块
   实际收藏是要与后台交互的
   【9-4】 详情收藏 -> 列表更新 -> 返回详情状态没有改变, 待解决
   【9-6】tab 页面事件传递
