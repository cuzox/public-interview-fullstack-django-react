import colors from 'constants/colors'
import { css } from '@emotion/react'

/*
  Renders an array of data into a table structure

  The mapping prop is a list of [label, renderFunc] arrays
  where `label` is displayed as the column header,
  and `renderFunc` renders the cell content, given the row object

  <Table
    data={[
      { id: 1, name: 'Cosmo' },
      { id: 2, name: 'Kona' },
    ]}
    mapping={[
      ['ID', (row) => row.id],
      ['Name', (row) => row.name],
    ]}
  />
*/

const Table = ({ data = [], mapping = {} }) => {
  const { labels, renderFuncs } = mapping.reduce((result, [label, renderFunc]) => {
    result.labels.push(label)
    result.renderFuncs.push(renderFunc)
    return result
  }, { labels: [], renderFuncs: [] })

  return (
    <table
      css={css`
        border-collapse: separate;
        border-spacing: 0;
        
        th, td {
          font-size: 16px;
          text-align: center; 
        }

        th {
          font-weight: 600;
          padding: 6px 8px;
        }

        td {
          background: #fff;
          border: 1px solid ${colors.GRAY_6};
          padding: 6px 8px;
        }

        tbody tr:first-child td:first-child {
          border-top-left-radius: 6px;
        }
        tbody tr:first-child td:last-child {
          border-top-right-radius: 6px;
        }
        tbody tr:last-child td:first-child {
          border-bottom-left-radius: 6px;
        }
        tbody tr:last-child td:last-child {
          border-bottom-right-radius: 6px;
        }
        tbody tr:not(:last-child) td {
          border-bottom: none;
        }
        tbody tr td:not(:last-child) {
          border-right: none;
        }
        
        tbody tr:nth-child(n+2) td {
          background: ${colors.GRAY_1};
        }
      `}
    >
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={index}>
              {label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, dataIndex) => (
          <tr key={dataIndex}>
            {renderFuncs.map((renderFunc, funcIndex) => (
              <td key={funcIndex}>
                {renderFunc(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
