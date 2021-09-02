import * as React from 'react';
import style from './license-plate-number.component.less';
import { useLicensePlateNumberStore } from './license-plate-number.component.store';
export default function LicensePlateNumberComponent(props: any) {
  const { state, handleRemove, handleAdd, handleModalChange } = useLicensePlateNumberStore();
  const { visible, onClose, onChange } = props;
  const data = [
    [
      {
        index: 1,
        dataSource: [
          { key: 1, title: '京' },
          { key: 2, title: '津' },
          { key: 3, title: '渝' },
          { key: 4, title: '沪' },
          { key: 5, title: '冀' },
          { key: 6, title: '晋' },
          { key: 7, title: '辽' },
          { key: 8, title: '吉' },
          { key: 9, title: '黑' },
          { key: 10, title: '苏' }
        ]
      },
      {
        index: 2,
        dataSource: [
          { key: 1, title: '浙' },
          { key: 2, title: '皖' },
          { key: 3, title: '闽' },
          { key: 4, title: '赣' },
          { key: 5, title: '鲁' },
          { key: 6, title: '豫' },
          { key: 7, title: '鄂' },
          { key: 8, title: '湘' },
          { key: 9, title: '粤' },
          { key: 10, title: '琼' }
        ]
      },
      {
        index: 3,
        dataSource: [
          { key: 1, title: '川' },
          { key: 2, title: '贵' },
          { key: 3, title: '云' },
          { key: 4, title: '陕' },
          { key: 5, title: '甘' },
          { key: 6, title: '青' },
          { key: 7, title: '蒙' },
          { key: 8, title: '桂' },
          { key: 9, title: '宁' },
          { key: 10, title: '新' }
        ]
      },
      {
        index: 4,
        dataSource: [
          { key: 11, title: 'ABC' },
          { key: 2, title: '藏' },
          { key: 3, title: '使' },
          { key: 4, title: '领' },
          { key: 5, title: '警' },
          { key: 6, title: '学' },
          { key: 7, title: '港' },
          { key: 12, title: '删除' }
        ]
      }
    ],
    [
      {
        index: 1,
        dataSource: [
          { key: 1, title: '1' },
          { key: 2, title: '2' },
          { key: 3, title: '3' },
          { key: 4, title: '4' },
          { key: 5, title: '5' },
          { key: 6, title: '6' },
          { key: 7, title: '7' },
          { key: 8, title: '8' },
          { key: 9, title: '9' },
          { key: 10, title: '0' }
        ]
      },
      {
        index: 2,
        dataSource: [
          { key: 1, title: 'Q' },
          { key: 2, title: 'W' },
          { key: 3, title: 'E' },
          { key: 4, title: 'R' },
          { key: 5, title: 'T' },
          { key: 6, title: 'Y' },
          { key: 7, title: 'U' },
          { key: 8, title: 'I' },
          { key: 9, title: 'P' }
        ]
      },
      {
        index: 3,
        dataSource: [
          { key: 1, title: 'A' },
          { key: 2, title: 'S' },
          { key: 3, title: 'D' },
          { key: 4, title: 'F' },
          { key: 5, title: 'G' },
          { key: 6, title: 'H' },
          { key: 7, title: 'J' },
          { key: 8, title: 'K' },
          { key: 9, title: 'L' }
        ]
      },
      {
        index: 4,
        dataSource: [
          { key: 11, title: '返回' },
          { key: 2, title: 'Z' },
          { key: 3, title: 'X' },
          { key: 4, title: 'C' },
          { key: 5, title: 'V' },
          { key: 6, title: 'B' },
          { key: 7, title: 'N' },
          { key: 8, title: 'M' },
          { key: 12, title: '删除' }
        ]
      }
    ]
  ];
  const Content = data[state.clickType].map((v: any) => {
    const { dataSource, index } = v;
    const Item = dataSource.map((val: any) => {
      const { title, key } = val;
      if (key === 11) {
        return (
          <li key={key} onClick={handleModalChange(title)} className={style['key-board-box']}>
            {title}
          </li>
        );
      } else if (key === 12) {
        return (
          <li key={key} onClick={handleRemove(onChange)} className={style['key-board-box']}>
            {title}
          </li>
        );
      } else {
        return (
          <li onClick={handleAdd(title, onChange)} key={key}>
            {title}
          </li>
        );
      }
    });
    return <ul key={index}>{Item}</ul>;
  });
  function renderBoard() {
    if (!visible) return null;
    return (
      <div className={style['license-plate-number']}>
        <p className={style.close} onClick={onClose}>
          关闭
        </p>
        {Content}
      </div>
    );
  }
  return <div>{renderBoard()}</div>;
}
