# react-native-marquee-easy

react native marquee component to easy use。<br>
纯js实现不依赖任何库，简单易使用。

```
yarn install react-native-marquee-easy
or
npm install react-native-marquee-easy
```

```Javascript
<Carousel
                itemDurations={2000}
                containerStyle={styles.cStyle}
                iterations={count}
                onFinished={() => {
                    console.log('test finished ani');
                }}
            >
                <View style={{ backgroundColor: 'green' }}>
                    <Text style={styles.text}>aaaaa</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.text}>bbbbbbb</Text>
                </View>
                <View style={{ backgroundColor: 'pink' }}>
                    <Text style={styles.text}>cccccccccc</Text>
                </View>
            </Carousel>
```

```Javascript
export type IProps = {
    direction?: 'horizontal' | 'vertical';
    delay?: number;
    iterations?: number;
    itemDurations?: number;
    containerStyle?: ViewStyle;
    onFinished?: () => void;
    children: any;
};
```


### 效果如下：
![marquee](https://github.com/wuyunqiang/react-native-marquee-easy/assets/13480948/55ea8946-f295-4395-8e96-5a19ed10417a)

