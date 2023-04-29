import React from 'react'
import styled from 'styled-components'

type Props = {
  value?: string;
  children?: React.ReactNode;
  marginLeft?: string;
  padding?:string;
  onClick?: () => void;
}

const CMButton = ({children,value,marginLeft,padding,onClick = () => {}}:Props)=> {
  return (
    <Button marginLeft={marginLeft} padding={padding} onClick={onClick}>
      {children ? children: value}
    </Button>
  )
}

const Button = styled.button<Props>`
  margin-left: ${({marginLeft})=>marginLeft};
  padding: ${({padding})=>padding};
  cursor: pointer;
`

export default CMButton