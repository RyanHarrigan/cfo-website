/** @jsxImportSource @emotion/react */
import {Container, Nav, Navbar} from "react-bootstrap";
import React, {RefObject, useCallback, useRef, useState} from "react";
import {
    LogoStyled,
    NavbarToggleStyled,
    NavStyled,
    NavLinkStyles,
    NavbarStyled,
    BottomNavBarDetail, NavbarBrandStyled,
} from './header-nav.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {ScrollingLink, useOnScreen} from "../../utilities";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const Toggle = ({label = '', ariaControls, providedRef}: {label?: string; ariaControls: string, providedRef?: RefObject<any>}) => {
    const ref = providedRef ? providedRef : null; // default to a dummy 'null' ref
    const color = 'var(--bs-white)';

    return <NavbarToggleStyled onClick={_.noop} label={label} ref={ref} aria-controls={ariaControls} >
        <FontAwesomeIcon icon={faBars} color={color} />
    </NavbarToggleStyled>
}

export const HeaderNavComponent = () => {
    const [activeKey, setActiveKey] = useState('home');
    const menuToggleRef = useRef(null);
    const isMenuToggleVisible = useOnScreen(menuToggleRef);
    const navigate = useNavigate();

    const toggleMenu = useCallback(async (path: string, toAnchor?: string) => {
        await navigate(path, {
            state: {
                toAnchor: toAnchor ?? '',
            }
        });
        if (isMenuToggleVisible && menuToggleRef?.current) {
            (menuToggleRef.current as any).click();
        }
    }, [isMenuToggleVisible, menuToggleRef, navigate]);

    return <NavbarStyled sticky="top" bg="primary" expand="lg">
        <Container>
            <NavbarBrandStyled onClick={() => toggleMenu('/', 'home')}>
                <LogoStyled
                    alt="Code for Orlando logo - an outline of an orange fruit with html bracket symbols inside"
                    src="/logo.svg"
                    className="d-inline-block align-top"
                />
            </NavbarBrandStyled>
            <Toggle providedRef={menuToggleRef} label={'Simple menu toggle'} ariaControls={'responsive-navbar-nav'} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <NavStyled
                    className="m-auto"
                    activeKey={activeKey}
                    onSelect={(selectedKey) => {
                        setActiveKey((selectedKey ?? ''))
                    }}
                    justify
                >
                    <Nav.Item>
                        <ScrollingLink onClick={() => toggleMenu('/', 'home')} cssStyles={NavLinkStyles} toAnchor={'home'}>Home</ScrollingLink>
                    </Nav.Item>
                    <Nav.Item>
                        <ScrollingLink onClick={() => toggleMenu('/', 'events')} cssStyles={NavLinkStyles} toAnchor={'events'}>Events</ScrollingLink>
                    </Nav.Item>
                    <Nav.Item>
                        <ScrollingLink onClick={() => toggleMenu('/', 'about')} cssStyles={NavLinkStyles} toAnchor={'about'}>About</ScrollingLink>
                    </Nav.Item>
                    <Nav.Item>
                        <ScrollingLink onClick={() => toggleMenu('/', 'partners')} cssStyles={NavLinkStyles} toAnchor={'partners'}>Partners</ScrollingLink>
                    </Nav.Item>
                    <Nav.Item>
                        <ScrollingLink onClick={() => toggleMenu('/', 'contact')} cssStyles={NavLinkStyles} toAnchor={'contact'}>Contact</ScrollingLink>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            css={NavLinkStyles}
                            eventKey={'external'}
                            onClick={() => toggleMenu('/conduct')}
                        >
                            Conduct
                        </Nav.Link>
                    </Nav.Item>
                </NavStyled>
            </Navbar.Collapse>
        </Container>
        <BottomNavBarDetail className={'position-absolute'} />
    </NavbarStyled>;
};
