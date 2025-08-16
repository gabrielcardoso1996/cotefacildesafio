import ReactECharts from 'echarts-for-react';
import styles from "./TaskStats.module.css";

interface TaskStatsProps {
  stats: {
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const totalTasks = stats.pending + stats.inProgress + stats.completed;

  // Configuração do gráfico de pizza
  const pieChartOption = {
    title: {
      text: 'Distribuição das Tarefas',
      left: 'center',
      textStyle: {
        color: 'var(--gray-100)',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: 'var(--gray-300)'
      }
    },
    series: [
      {
        name: 'Tarefas',
        type: 'pie',
        radius: '50%',
        data: [
          { value: stats.pending, name: 'Pendente', itemStyle: { color: '#EAB308' } },
          { value: stats.inProgress, name: 'Em Progresso', itemStyle: { color: '#3B82F6' } },
          { value: stats.completed, name: 'Concluída', itemStyle: { color: '#10B981' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const barChartOption = {
    title: {
      text: 'Progresso das Tarefas',
      left: 'center',
      textStyle: {
        color: 'var(--gray-100)',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Pendente', 'Em Progresso', 'Concluída'],
      axisLabel: {
        color: 'var(--gray-300)'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'var(--gray-300)'
      }
    },
    series: [
      {
        data: [
          { value: stats.pending, itemStyle: { color: '#EAB308' } },
          { value: stats.inProgress, itemStyle: { color: '#3B82F6' } },
          { value: stats.completed, itemStyle: { color: '#10B981' } }
        ],
        type: 'bar',
        barWidth: '60%'
      }
    ]
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            ⏳
          </div>
          <div className={styles.statInfo}>
            <h3>Pendentes</h3>
            <span className={styles.statNumber}>{stats.pending}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            🔄
          </div>
          <div className={styles.statInfo}>
            <h3>Em Progresso</h3>
            <span className={styles.statNumber}>{stats.inProgress}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            ✅
          </div>
          <div className={styles.statInfo}>
            <h3>Concluídas</h3>
            <span className={styles.statNumber}>{stats.completed}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            📊
          </div>
          <div className={styles.statInfo}>
            <h3>Total</h3>
            <span className={styles.statNumber}>{totalTasks}</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <ReactECharts option={pieChartOption} style={{ height: '300px' }} />
        </div>
        <div className={styles.chart}>
          <ReactECharts option={barChartOption} style={{ height: '300px' }} />
        </div>
      </div>
    </div>
  );
}
