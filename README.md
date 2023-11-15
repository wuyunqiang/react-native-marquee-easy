# react-native-marquee-easy

react native marquee component to easy use。<br>
纯 js 实现不依赖任何库，简单易使用。

### 效果如下：
![marquee](https://github.com/wuyunqiang/react-native-marquee-easy/assets/13480948/55ea8946-f295-4395-8e96-5a19ed10417a)


```
yarn install react-native-marquee-easy
or
npm install react-native-marquee-easy
```

```Javascript
import { Marquee } from 'react-native-marquee-easy';

const styles = StyleSheet.create({
    cStyle: {
        backgroundColor: 'red',
        height: 20,
        marginBottom: 30,
        width: 200,
    },
    item: {
        backgroundColor: 'blue',
        height: 20,
    },
    page: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        height: 20,
        marginHorizontal: 20,
        padding: 0,
    },
});

const App = () => {
  const [count, changeCount] = useState(0);

  setTimeout(() => {
    changeCount(3);
  }, 3000);

  return (
    <View style={styles.page}>
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

      <Marquee
        direction={"vertical"}
        containerStyle={styles.cStyle}
        itemDurations={2000}
        delay={2000}
        swiperItemDurations={500}
        type={"swipe"}
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

      <Marquee
        itemDurations={2000}
        containerStyle={styles.cStyle}
        direction={"vertical"}
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
    </View>
  );
};
```

```Javascript
export type IProps = {
    direction?: 'horizontal' | 'vertical';
    delay?: number;
    iterations?: number; // -1 for infinite;
    itemDurations?: number;
    containerStyle?: ViewStyle;
    onFinished?: () => void;
    children: any;
    type?: 'swipe' | 'normal';
    swiperItemDurations?: number;
};
```

