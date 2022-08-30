import React, { useRef, useState } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useLocation, useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { pathname } = useLocation();
  const { params: { id } } = useRouteMatch();
  const type = pathname.includes('drinks') ? 'drinks' : 'foods';

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const onCopy = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setShow(!show);
  };

  return (
    <>
      <Button
        ref={ target }
        variant="outline-success"
        data-testid="share-btn"
        onClick={ () => onCopy() }
      >
        <img src={ shareIcon } alt="Share icon" />
      </Button>
      <Overlay target={ target.current } show={ show } placement="bottom">
        <Tooltip id="overlay-example">
          Link copied!
        </Tooltip>
      </Overlay>
    </>
  );
}

export default ShareButton;
