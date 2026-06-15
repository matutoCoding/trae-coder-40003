import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface RecordItemProps {
  title: string;
  subtitle?: string;
  tags?: { text: string; type: 'pass' | 'fail' | 'warning' | 'info' | 'pending' | 'processing' | 'completed' }[];
  rightText?: string;
  rightSubText?: string;
  onClick?: () => void;
}

const tagTypeMap: Record<string, string> = {
  pass: '通过',
  fail: '不合格',
  warning: '异常',
  info: '信息',
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
};

const RecordItem: React.FC<RecordItemProps> = ({ title, subtitle, tags, rightText, rightSubText, onClick }) => {
  return (
    <View className={styles.item} onClick={onClick}>
      <View className={styles.left}>
        <Text className={styles.title}>{title}</Text>
        {subtitle && <Text className={styles.subtitle}>{subtitle}</Text>}
        {tags && tags.length > 0 && (
          <View className={styles.tagRow}>
            {tags.map((tag, idx) => (
              <View key={idx} className={classnames(styles.tag, styles[`tag${tag.type.charAt(0).toUpperCase() + tag.type.slice(1)}`])}>
                <Text className={styles.tagText}>{tag.text || tagTypeMap[tag.type]}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      {(rightText || rightSubText) && (
        <View className={styles.right}>
          {rightText && <Text className={styles.rightText}>{rightText}</Text>}
          {rightSubText && <Text className={styles.rightSubText}>{rightSubText}</Text>}
        </View>
      )}
    </View>
  );
};

export default RecordItem;
