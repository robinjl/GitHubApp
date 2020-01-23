# GitHubApp

[慕课网 - 新版 React Native 从入门到实战打造高质量上线 App（再升级）](https://coding.imooc.com/learn/list/304.html)

## issues

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
