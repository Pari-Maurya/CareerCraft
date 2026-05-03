// src/components/dashboard/InterestChart.jsx
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const InterestChart = ({ scores }) => {
  const chartRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current || !scores) return

    if (instanceRef.current) {
      instanceRef.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    instanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(scores),
        datasets: [
          {
            data: Object.values(scores),
            backgroundColor: [
              'rgba(59, 130, 246, 0.85)',  // blue - Tech
              'rgba(168, 85, 247, 0.85)',   // purple - Design
              'rgba(245, 158, 11, 0.85)',   // amber - Management
              'rgba(68, 135, 72, 0.85)',    // sage - Research
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(168, 85, 247)',
              'rgb(245, 158, 11)',
              'rgb(68, 135, 72)',
            ],
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: '"DM Sans", sans-serif',
                size: 12,
              },
              color: '#4e4a3f',
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.parsed}%`,
            },
            titleFont: { family: '"DM Sans", sans-serif' },
            bodyFont: { family: '"DM Sans", sans-serif' },
            backgroundColor: 'rgba(37, 35, 32, 0.92)',
            padding: 10,
            cornerRadius: 8,
          },
        },
        animation: {
          animateRotate: true,
          duration: 800,
          easing: 'easeInOutQuart',
        },
      },
    })

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy()
        instanceRef.current = null
      }
    }
  }, [scores])

  return (
    <div className="card p-6">
      <h3 className="font-display font-semibold text-ink-900 mb-1">Interest Distribution</h3>
      <p className="text-sm text-ink-400 mb-5">Based on your quiz responses</p>
      <div className="relative h-60">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default InterestChart;