# react-native-marquee-easy

react native marquee component to easy use

```
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

            <Carousel itemDurations={4000} containerStyle={styles.cStyle}>
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

            <Carousel itemDurations={2000} containerStyle={styles.cStyle} direction={'vertical'}>
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
