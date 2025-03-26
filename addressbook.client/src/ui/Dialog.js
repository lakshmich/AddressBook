import styled from "styled-components";

const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse; /* Default: column-reverse */

  @media (min-width: 640px) {
    flex-direction: row; /* Switch to row layout on small screens (sm) */
    justify-content: flex-end; /* Align items to the end */
    gap: 8px; /* Space between child elements */
  }
`;

export default DialogFooter;
