import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export type TagType = 'pass' | 'fail' | 'warning' | 'info' | 'pending' | 'processing' | 'completed';

interface RecordItemProps {
  title: string;
  subtitle?: string;
  tags?: { text: string; type: TagType }[];
  rightText?: string;
  rightSubText?: string;
  onClick?: () => void;
}

const tagTypeMap: Record<TagType, string> = {
  pass: '通过',
  fail: '不合格',
  warning: '异常',
  info: '信息',
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
};

const tagClassMap: Record<TagType, string> = {
  pass: 'tagPass',
  fail: 'tagFail',
  warning: 'tagWarning',
  info: 'tagInfo',
  pending: 'tagPending',
  processing: 'tagProcessing',
  completed: 'tagCompleted',
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
              <View key={idx} className={classnames(styles.tag, styles[tagClassMap[tag.type]])}>
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
