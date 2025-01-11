import { Icon } from '@iconify/react'
import { useId, useMemo, type FC } from 'react'
import { cn } from '../../lib/cn'
import {
  getFullCell,
  type GameMappingVariant,
} from '../../lib/schemas/gameMappingsSchema'
import {
  iconTransformToCss,
  translateColor,
} from '../../lib/utils/mappingUtils'
import { RainbowGradient } from './RainbowGradient'

export const Cell: FC<{
  cardId: number
  mapping: GameMappingVariant
  className?: string
  onClick?: (cardId: number) => void
  rainbowGradientId?: string
}> = ({
  cardId,
  mapping,
  className,
  onClick,
  rainbowGradientId: rainbowGradientIdProp,
}) => {
  const cell = useMemo(() => getFullCell(cardId, mapping), [cardId, mapping])

  const id = useId()
  const maskId = `mask-${id}`
  const rainbowGradientId = rainbowGradientIdProp ?? `rainbow-gradient-${id}`

  const textConfig = useMemo(() => {
    if (!cell?.text) return null

    const original =
      typeof cell.text === 'string' ? { content: cell.text } : cell.text

    return {
      ...original,
      size: original.size ?? 100,
      weight: original.weight ?? 'bold',
      fill: translateColor(original.fill) ?? '#fff',
      stroke: {
        ...original.stroke,
        color: translateColor(original.stroke?.color) ?? '#000',
        width: original.stroke?.width ?? 20,
      },
      transform: iconTransformToCss(original.transform),
    }
  }, [cell?.text])

  return (
    <div
      key={cardId}
      className={cn(
        'flex flex-col items-center justify-center overflow-hidden relative transition-colors',
        !!cell && 'cursor-pointer',
        className
      )}
      onClick={onClick ? () => onClick(cardId) : undefined}
    >
      {!!cell && (
        <>
          {cell.icon?.src && (
            <>
              {cell.icon?.fill === 'rainbow' ? (
                <svg className="absolute inset-0" viewBox="0 0 512 512">
                  <defs>
                    <mask id={maskId}>
                      <rect x="0" y="0" width="512" height="512" fill="black" />
                      <Icon
                        icon={cell.icon.src}
                        width="512"
                        height="512"
                        style={{
                          color: '#ffffff',
                        }}
                      />
                    </mask>
                    {!rainbowGradientIdProp && (
                      <RainbowGradient id={rainbowGradientId} />
                    )}
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="512"
                    height="512"
                    fill={`url(#${rainbowGradientId})`}
                    mask={`url(#${maskId})`}
                    style={{
                      transform: iconTransformToCss(cell.icon.transform),
                      transformOrigin: 'center',
                    }}
                  />
                  {cell.icon.stroke && (
                    <Icon
                      icon={cell.icon.src}
                      width="512"
                      height="512"
                      style={{
                        color: 'transparent',
                        stroke: translateColor(cell.icon.stroke.color),
                        strokeWidth: cell.icon.stroke.width
                          ? (cell.icon.stroke.width / 190) * 512
                          : undefined,
                        transform: iconTransformToCss(cell.icon.transform),
                        transformOrigin: 'center',
                      }}
                    />
                  )}
                </svg>
              ) : (
                <Icon
                  icon={cell.icon.src}
                  className="size-full"
                  stroke={translateColor(cell.icon.stroke?.color)}
                  strokeWidth={
                    cell.icon.stroke?.width
                      ? (cell.icon.stroke.width / 190) * 512
                      : undefined
                  }
                  style={{
                    color: translateColor(cell.icon.fill),
                    transform: iconTransformToCss(cell.icon.transform),
                    transformOrigin: 'center',
                  }}
                />
              )}
            </>
          )}
          {textConfig && (
            <svg
              className="absolute select-none font-brand inset-0"
              style={{
                transform: textConfig.transform,
                transformOrigin: 'center',
              }}
              viewBox="0 0 190 190"
            >
              <g
                xmlns="http://www.w3.org/2000/svg"
                fontFamily="Manrope, Inter var, Inter var experimental, Inter, Arial, Helvetica, sans-serif"
                fontSize={textConfig.size}
                fontStyle="normal"
                fontWeight={textConfig.weight}
                textAnchor="middle"
                dominantBaseline="middle"
                textDecoration={textConfig.fill}
              >
                <g>
                  <text
                    stroke={textConfig.stroke.color}
                    strokeWidth={textConfig.stroke.width}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    x="50%"
                    y="50%"
                  >
                    {textConfig.content}
                  </text>
                  <text fill={textConfig.fill} x="50%" y="50%">
                    {textConfig.content}
                  </text>
                </g>
              </g>
            </svg>
          )}
          {!!cell.drawings && cell.drawings?.length > 0 && (
            <svg viewBox="0 0 190 190" className="absolute inset-0">
              <path
                fillRule="evenodd"
                d="M145.905 7.399c.47-1.909 1.494-3.351 2.455-4.356 1.792-1.874 4.565-3.392 7.993-2.972 2.577.295 4.623 1.532 6.113 2.932l6.123 6.196.036.038.032.034 5.41 5.501 2.084 1.821.001.001.074.063a4.85 4.85 0 0 1 .374.355l.075.078c.683.721 1.31 1.613 1.761 2.651.604.023 1.21.114 1.809.277 3.146.856 5.487 3.538 5.86 6.813.089.783.181 1.156.3 1.49.141.397.393.942 1.005 2.028.978 1.737 1.245 3.712.856 5.559.264.318.506.662.721 1.031 2.098 3.603.832 8.189-2.756 10.239-.418.239-.718.437-.929.591l.016.313.008.145v.002a1.74 1.74 0 0 1 .004.075c.044.786.123 2.215-.076 3.778-.342 2.684-1.207 5.617-3.407 8.106-2.172 2.457-4.903 3.635-7.23 4.316-4.318 1.265-8.289-.135-10.669-1.274-1.384-.663-2.978-1.718-4.045-2.455l-.112-.078c-2.45.82-5.027 1.404-7.562 1.65-4.076.397-7.78-2.558-8.192-6.705-.406-4.091 2.557-7.668 6.546-8.156a14.66 14.66 0 0 1 .756-5.69c.977-2.857 2.936-5.634 5.886-7.362 2.543-1.49 5.626-2.052 8.715-1.308l-.042-.253c-.073-.478-.102-.954-.089-1.425-.173-.086-.319-.163-.517-.279-.169-.099-.259-.162-.424-.268-3.786-2.417-5.759-4.422-8.86-7.334l-.006-.005-.023-.022-5.991-5.699c-1.295-1.218-2.613-2.739-3.49-4.588l-.004-.008c-.009-.018-.017-.036-.026-.055l-.01-.022-.02-.045-.003-.007c-.764-1.706-1.029-3.691-.53-5.715z"
                fill="#fff"
              />
              <g fill="#000">
                <path d="M150.759 8.593c.203-.825.664-1.521 1.213-2.096.976-1.02 2.272-1.655 3.793-1.463 1.267.14 2.362.751 3.278 1.611l5.945 6.021.002.002.032.034 5.622 5.712 2.254 1.973.075.065.07.073c.703.742 1.167 1.714 1.083 2.852l-.004.053-.007.055c-.121.917-.54 1.71-1.157 2.355-.624.653-1.39 1.119-2.276 1.353-.944.249-1.954.187-2.873-.349l-.07-.041-.063-.044-.002-.001c-2.508-1.749-5.257-4.036-8.244-6.841l-.005-.005-6.002-5.709c-1.049-.986-1.895-2.016-2.408-3.098l-.004-.008-.01-.023-.003-.007c-.347-.774-.45-1.621-.239-2.476zm21.556 20.484c-1.075.617-1.66 1.822-1.475 3.04s1.103 2.199 2.315 2.474c2.34.531 3.492 1.022 5.787 2.288 1.181.651 2.655.447 3.61-.5s1.16-2.408.501-3.578c-1.302-2.311-1.685-3.371-1.917-5.407-.138-1.218-1.011-2.229-2.204-2.554a3.04 3.04 0 0 0-3.211 1.081c-1.336 1.749-1.972 2.334-3.406 3.156z" />
                <path
                  fillRule="evenodd"
                  d="M156.069 43.412a9.59 9.59 0 0 0 .702 7.792c-1.803.616-3.696 1.058-5.516 1.235-1.374.134-2.378 1.346-2.243 2.707s1.358 2.356 2.732 2.222c2.908-.283 5.969-1.109 8.764-2.283l.364.227s3.247 2.454 5.234 3.405 4.562 1.731 7.105.986c1.877-.55 3.595-1.365 4.889-2.829 1.302-1.473 1.925-3.317 2.194-5.427.14-1.105.083-2.152.039-2.947l-.008-.149c-.048-.886-.062-1.459.031-1.986.132-.741.55-1.904 3.393-3.529 1.196-.684 1.606-2.198.916-3.383s-2.218-1.591-3.414-.907c-3.655 2.09-5.347 4.32-5.817 6.959-.206 1.157-.146 2.265-.101 3.098v.016c.05.909.084 1.554.001 2.207-.197 1.548-.582 2.317-.994 2.784-.42.475-1.125.927-2.546 1.343-.35.102-.786.125-1.314.043-.61-.094-1.341-.328-2.199-.739l-.686-.352c-.754-.412-1.503-.9-2.217-1.412.757-.508 1.456-1.041 2.082-1.591 1.794-1.578 3.487-3.748 3.488-6.293.002-2.856-2.053-4.892-4.864-6.17-2.232-1.014-4.501-.767-6.332.306-1.761 1.032-3.031 2.76-3.683 4.667zm7.931-.47a1.72 1.72 0 0 0-1.704.068c-.573.336-1.161 1.022-1.493 1.993a4.65 4.65 0 0 0 .553 4.144c1.069-.613 2.016-1.273 2.785-1.95 1.481-1.302 1.809-2.222 1.809-2.591v-.003c0-.077.007-.772-1.95-1.661z"
                />
              </g>
            </svg>
          )}
        </>
      )}
    </div>
  )
}
