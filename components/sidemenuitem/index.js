/* eslint-disable react/no-array-index-key */
import IntlMessages from 'helpers/IntlMessages';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavItem } from 'reactstrap';

function SideMenuItem({ item, index, openSubMenu, selected, sub, props, collapsedMenus, toggleMenuCollapse, }) {
  const [activClass, setActivClass] = useState('')
  const menuItem = useSelector(state => state.menu)

  useEffect(() => {
    if (menuItem) {
      setActivClass(menuItem.selectedMenu.subMenu === sub.label ? 'active' : '')
    }
  }, [menuItem])
  return (
    <>
      <NavItem
        key={`${item.id}_${index}`}
        onClick={(e) => {
          props.changeIsSelected({ menu: item.label, subMenu: sub.label })
          openSubMenu(e, item)
        }}

        // className={`${(selected.subMenu === sub.label) ? 'active' : ''}`}
        // style={{ backgroundColor: selected.subMenu === sub.label && selected.subMenu === sub.label ? 'red' : 'transparent' }}
        className={`${activClass} ${sub.subs && sub.subs.length > 0
          ? 'has-sub-item'
          : ''
          } `}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {sub.newWindow ? (
          <a
            href={sub.to}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className={sub.icon} />{' '}
            <IntlMessages id={sub.label} />
          </a>
        ) : sub.subs && sub.subs.length > 0 ? (
          <>
            <Link
              href={sub.to}
            >
              <a
                className={`rotate-arrow-icon opacity-50 ${collapsedMenus.indexOf(
                  `${item.id}_${index}`
                ) === -1
                  ? ''
                  : 'collapsed'
                  }`}
                id={`${item.id}_${index}`}
                onClick={(e) => {

                  toggleMenuCollapse(
                    e,
                    `${item.id}_${index}`
                  )
                }}
              >

                <i className="simple-icon-arrow-down" />{' '}
                <IntlMessages id={sub.label} />
              </a>
            </Link>


          </>
        ) : (
          <Link href={sub.to}>
            <a>
              <i className={sub.icon} />{' '}
              <IntlMessages id={sub.label} />
            </a>
          </Link>
        )}
      </NavItem>
    </>
  );
}

export default SideMenuItem;
