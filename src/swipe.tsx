/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { LayoutRectangle, ViewStyle } from "react-native";
import { Animated, Easing, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  horizontal: {
    flexDirection: "row",
  },
  item: {
    display: "flex",
  },
});

export type IProps = {
  direction?: "horizontal" | "vertical";
  delay?: number;
  iterations?: number;
  itemDurations?: number;
  containerStyle?: ViewStyle;
  onFinished?: () => void;
  type?: "swipe" | "normal";
  swiperItemDurations?: number;
  list: any[];
};
export const Carousel: FC<IProps> = (props) => {
  const {
    list,
    delay,
    iterations = -1,
    itemDurations = 2000,
    swiperItemDurations = 500,
    containerStyle,
    direction = "horizontal",
    onFinished,
  } = props;
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
  });
  const [length, setLength] = useState(-1);
  const offsetAni = useRef(new Animated.Value(0)).current;
  const aniRef = useRef<any>();
  const timerRef = useRef<any>();
  const listItemRef = useRef<LayoutRectangle[]>([]);
  const contentW = listItemRef.current.reduce((sum, cur) => sum + cur.width, 0);
  const contentH = listItemRef.current.reduce(
    (sum, cur) => sum + cur.height,
    0
  );

  const offsetRef = useRef(0);
  const swiper = (wh: string, offset: number) => {
    if (!offsetRef.current) {
      offsetRef.current = offset;
    }
    let init = true;
    let count = 0;
    let loop = 0;
    const exe = (distance) => {
      timerRef.current && clearTimeout(timerRef.current);
      if (iterations > 0 && loop > iterations) {
        return;
      }
      timerRef.current = setTimeout(
        () => {
          let duration = swiperItemDurations;
          if (offsetRef.current !== offset) {
            duration = 0;
          }
          Animated.timing(offsetAni, {
            toValue: -distance,
            duration,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start(() => {
            offsetRef.current = offset;
            /**循环一轮到结尾后恢复到第一个*/
            if (count % list.length === 0) {
              count = 0;
              loop = loop + 1;
              offsetAni.setValue(0);
              exe(listItemRef.current[count][wh]);
              return;
            }
            exe(distance + listItemRef.current[count][wh]);
          });
          init = false;
          count++;
        },
        init ? 0 : itemDurations
      );
    };
    exe(listItemRef.current[count][wh]);
  };

  useEffect(() => {
    if (list.length <= 1 || length < list.length - 1) {
      return;
    }
    if (
      contentH &&
      containerLayout.height &&
      contentH > containerLayout.height &&
      iterations !== 0 &&
      direction === "vertical"
    ) {
      setTimeout(() => {
        swiper("height", contentH);
      }, delay || 0);
    }
  }, [contentH, containerLayout.height, iterations, length]);

  useEffect(() => {
    if (list.length <= 1 || length < list.length - 1) {
      return;
    }
    if (
      contentW &&
      containerLayout.width &&
      contentW > containerLayout.width &&
      iterations !== 0 &&
      direction === "horizontal"
    ) {
      setTimeout(() => {
        swiper("width", contentW);
      }, delay || 0);
    }
  }, [contentW, containerLayout.width, iterations, length]);

  useEffect(() => {
    return () => {
      if (aniRef.current) {
        aniRef.current.stop();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  let showLast = contentW > containerLayout.width;
  if (direction === "vertical") {
    showLast = contentH > containerLayout.height;
  }
  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={(event) => {
        const layout = event?.nativeEvent?.layout || {};
        setContainerLayout(layout as any);
      }}
    >
      <Animated.View
        style={[
          styles.item,
          direction === "horizontal" && styles.horizontal,
          {
            transform:
              direction === "horizontal"
                ? [{ translateX: offsetAni }]
                : [{ translateY: offsetAni }],
          },
        ]}
      >
        {list.map((item, index) => (
          <View
            style={[styles.item]}
            onLayout={(event) => {
              const layout =
                event?.nativeEvent?.layout || ({} as LayoutRectangle);
              listItemRef.current[index] = layout;
              setLength((o) => {
                return (o + 1) % list.length;
              });
            }}
          >
            {item}
          </View>
        ))}

        {showLast ? (
          <View
            style={[
              styles.item,
              direction === "horizontal" && styles.horizontal,
            ]}
          >
            {list.slice(0, 1)}
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default Carousel;
