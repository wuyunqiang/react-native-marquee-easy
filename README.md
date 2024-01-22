使用react native实现一个跨端的跑马灯轮播组件。

# 效果如图
![swipe.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3172a2645ef84e9d841e5fc8b1156b58~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=590&h=190&s=336401&e=gif&f=237&b=fcfbff)

![normal.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3447307bb5d34a7aae0f5a700547af34~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=590&h=182&s=1249507&e=gif&f=263&b=fdfcff)
## 例子
### 配置
```
type IProps = {
    direction?: 'horizontal' | 'vertical';
    delay?: number;
    iterations?: number;
    itemDurations?: number;
    containerStyle?: ViewStyle;
    onFinished?: () => void;
    children: any;
    type?: 'swipe' | 'normal';
    swiperItemDurations?: number;
};
```
### demo
```
import {Marquee} from 'react-native-marquee-easy'
<Marquee
        itemDurations={2000}
        containerStyle={styles.cStyle}
        iterations={count}
        onFinished={() => {
          console.log("test finished ani");
        }}
      >
        <View style={{ backgroundColor: "green" }}>
          <Text style={styles.text}>aaaaa</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>bbbbbbb</Text>
        </View>
        <View style={{ backgroundColor: "pink" }}>
          <Text style={styles.text}>cccccccccc</Text>
        </View>
      </Marquee>
```

# 功能
**使用简单 纯js实现不依赖任何第三方库** <br>
**支持水平垂直两个方向**<br>
**支持文字&view**<br>
**两种模式**
1. type=normal 连续不间断滚动 
2. type=swipe  停顿式轮播滚动

# 原理
1. 加入输入的内容是【item1, item2, item3】
2. 首先会在最后一个item后面 再添加一个重复的item1视图变为【item1,item2,item3,item1】
3. 一次如图滚动
![截屏2024-01-22 下午3.13.58.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce7e8a40f24c40b6a4db207c6db4ef34~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1844&h=650&s=42544&e=png&b=ffffff)

![截屏2024-01-22 下午3.14.54.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/674a5216d2074818a6c23b368d41459b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1806&h=706&s=44317&e=png&b=ffffff)

![截屏2024-01-22 下午3.15.05.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808fdb8105644755b0291616d43fb5a9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1762&h=682&s=41677&e=png&b=ffffff)

![截屏2024-01-22 下午3.15.39.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae4e7c1c63fd4634828006dd47d08c06~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2674&h=944&s=79745&e=png&b=ffffff)
4. 当滚动到最后一项时 再将动画重置为初始状态 因为第一项和最后一项相同 所以视图不会刷新 实现无限滚动。


# 代码仓库

github:[react-native-marquee-easy](https://github.com/wuyunqiang/react-native-marquee-easy)

npm：[react-native-marquee-easy](https://www.npmjs.com/package/react-native-marquee-easy)

