<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="28" class="row01" style="margin-bottom: 28px;">
      <el-col :span="6">
        <div class="bg-white">
          <div class="flex flex-column">
            <span class="fs-32 num">{{ data.totalMoney }}</span>
            <span>总成交额</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-white">
          <div class="flex flex-column">
            <span class="fs-32 num">{{ data.totalCommission }}</span>
            <span>总佣金额</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-white">
          <div class="flex flex-column">
            <span class="fs-32 num">{{ data.todayMoney }}</span>
            <span>今日成交额</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-white">
          <div class="flex flex-column">
            <span class="fs-32 num">{{ data.userNum1 }}</span>
            <span>用户量</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="row02 bg-white" style="margin-bottom: 28px;">
      <el-row :gutter="28">
        <el-col :span="6">
          <div class="bg-white padding-30 flex flex-column">
            <span class="fs-26 num">{{ data.yesterdayOrder }}</span>
            <span>昨日订单数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-white padding-30 flex flex-column">
            <span class="fs-26 num">{{ data.todayOrder }}</span>
            <span>今日订单数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-white padding-30 flex flex-column">
            <span class="fs-26 num">{{ data.yesterday }}</span>
            <span>昨日佣金</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-white padding-30 flex flex-column">
            <span class="fs-26 num">{{ data.today }}</span>
            <span>今日佣金</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-card shadow="never">
      <!-- 流量趋势 -->
      <div ref="echart_wrap" class="echart_wrap"></div>
    </el-card>
    
    <!-- <pre>{{ data }}</pre> -->
  </section>
</template>

<script>
import echarts from "echarts";
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      data: {},
      chart: null,
      dataObj: this.value,
      colorArray: this.$store.state.colorArray
    }
  },
  computed: {
  },
  methods: {
    query () {
      this.$http.post('/api/Home/GetTotalStatistics').then(res => {
        this.data = res.data
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    },
    initCharts() {
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }

      this.charts = echarts.init(this.$refs['echart_wrap'])
      this.charts.setOption({
        title: {
          left: 'left',
          text: '流量趋势',
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#FFFFF99'
          },
          icon: 'roundRect'
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: '#cccccc'
            }
          },
          // name: '年-月'
          // type: 'category',
          // boundaryGap: false,
          // data: date
        },
        yAxis: {
          type: 'value',
          // boundaryGap: [0, '100%']
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#cccccc'
            }
          }
        },
        grid: {
          top: 46,
          left: 46,
          right: 46,
          bottom: "10%"
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     start: 0,
        //     end: 10
        //   },
        //   {
        //     start: 0,
        //     end: 10,
        //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //     handleSize: '80%',
        //     handleStyle: {
        //       color: '#fff',
        //       shadowBlur: 3,
        //       shadowColor: 'rgba(0, 0, 0, 0.6)',
        //       shadowOffsetX: 2,
        //       shadowOffsetY: 2
        //     }
        //   }
        // ],
        // series: [
        //   {
        //     name: '模拟数据',
        //     type: 'line',
        //     smooth: true,
        //     symbol: 'none',
        //     sampling: 'average',
        //     itemStyle: {
        //       color: 'rgb(255, 70, 131)'
        //     },
        //     areaStyle: {
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //         {
        //           offset: 0,
        //           color: 'rgb(255, 158, 68)'
        //         },
        //         {
        //           offset: 1,
        //           color: 'rgb(255, 70, 131)'
        //         }
        //       ])
        //     },
        //     data: data
        //   }
        // ]
        series: [
          {
            type: 'line',
            smooth: true,
            name: '新增注册量',
            color: '#9956FB',
            data: [
              176004,
              109944,
              111600,
              104418,
              86202,
              158004,
              140004,
              122004,
              90414,
              128302,
              158004,
              212004
            ]
          },
          {
            type: 'line',
            smooth: true,
            name: '订单数量',
            color: '#EC4BD6',
            data: [
              70220,
              61290,
              52060,
              46050,
              33520,
              105530,
              77510,
              79400,
              34660,
              45940,
              42520,
              21477
            ]
          },
        ]
      })
    },
    initChartsLine() {
      let _self = this;
      // 配置对象
      let optionData = {};
      let boundaryGap =
          _self.dataObj.boundaryGap === false ? false : true;
      let colorArray = _self.colorArray;
      // 配置项
      let seriesObj = [];
      if (_self.dataObj && _self.dataObj.data) {
          _self.dataObj.data.forEach((element, index) => {
            let m = index % colorArray.length;
            let tempArray = {
              name: _self.dataObj.nameArray[index],
              data: element,
              type: _self.dataObj.type ? _self.dataObj.type : "line",
              smooth: _self.dataObj.smooth,
              areaStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: colorArray[m] + "3F" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: colorArray[m] + "00" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            };
            seriesObj.push(tempArray);
          });
      } else if (_self.dataObj.series) {
        seriesObj = Object.assign(seriesObj, _self.dataObj.series);
      }
      // X轴

      let xAxis = [];
      if (_self.dataObj.xTitle) {
        xAxis = {
          type: "category",
          data: _self.dataObj.xTitle,
          boundaryGap: boundaryGap,
          axisLabel: {
            interval: 0,
            rotate: _self.dataObj.titleRotate
              ? _self.dataObj.titleRotate
              : 0
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0, 0, 0, 0.45)"
            }
          }
        };
      } else if (_self.dataObj.xAxis) {
        xAxis = Object.assign(xAxis, _self.dataObj.xAxis);
      }

      // Y轴
      let yAxis = [];
      if (_self.dataObj.yAxis) {
        yAxis = Object.assign(yAxis, _self.dataObj.yAxis);
      } else {
        yAxis = {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(0, 0, 0, 0.45)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              //设置刻度线粗度(粗的宽度)
              width: 1,
              //颜色数组，数组数量要比刻度线数量大才能不循环使用
              color: [
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)",
                "rgba(0, 0, 0, 0.15)"
              ]
            }
          }
        };
      }

      let visualMap = null;
      if (_self.dataObj.visualMap) visualMap = Object.assign(visualMap, _self.dataObj.visualMap);

      let tooltip = { trigger: "axis" };
      if (_self.dataObj.tooltip) tooltip = Object.assign(tooltip, _self.dataObj.tooltip);

      let legend = { left: 0 };
      if (_self.dataObj.legend) legend = Object.assign(legend, _self.dataObj.legend);
      // 标题
      let title = {};
      if (_self.dataObj.title) title = Object.assign(title, _self.dataObj.title);

      // 显示范围
      let grid = {
        // 间距
        top: "5%",
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true
      };
      if (title !== {}) grid.top = "25%";

      optionData = {
        // 基础配置
        title: title,
        xAxis: xAxis,
        yAxis: yAxis,
        visualMap: visualMap,
        tooltip: tooltip,
        legend: legend,
        grid: grid,
        color: colorArray,
        series: seriesObj
      };

      _self.myChart.setOption(optionData);
    },
    initChartsPie() {
        let _self = this;
        // 配置对象
        let optionData = {};
        let colorArray = _self.colorArray;
        // 配置项
        let seriesObj = [];
        let tempArray = {
            type: "pie",
            name: _self.dataObj.name,
            radius: _self.dataObj.radius,
            center: _self.dataObj.center,
            roseType: _self.dataObj.roseType,
            label: _self.dataObj.label,
            data: _self.dataObj.data,
            areaStyle: {
                normal: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: colorArray[0] + "3F" // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: colorArray[0] + "00" // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function() {
                return Math.random() * 200;
            }
        };
        seriesObj.push(tempArray);

        let tooltip = {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        };
        if (_self.dataObj.tooltip) {
            tooltip = Object.assign(tooltip, _self.dataObj.tooltip);
        }

        // 标题
        let title = {};
        if (_self.dataObj.title) {
            title = Object.assign(title, _self.dataObj.title);
        }

        // 视觉加阴影
        let visualMap = {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                // colorLightness: [0, 1]
            }
        };
        if (_self.dataObj.visualMap) {
            visualMap = Object.assign(visualMap, _self.dataObj.visualMap);
        }

        // 筛选
        let legendData = [];
        _self.dataObj.data.forEach(element => {
            legendData.push(element.name);
        });
        let legend = {
            orient: "vertical",
            x: "left",
            data: legendData
        };
        if (_self.dataObj.legend) {
            legend = Object.assign(legend, _self.dataObj.legend);
        }

        // 显示范围
        let grid = {
            // 间距
            top: "5%",
            left: "2%",
            right: "2%",
            bottom: "3%",
            containLabel: true
        };
        if (title !== {}) {
            grid.top = "25%";
        }

        optionData = {
            // 基础配置
            title: title,
            tooltip: tooltip,
            legend: legend,
            visualMap: visualMap,
            grid: grid,
            color: colorArray,
            series: seriesObj
        };

        _self.myChart.setOption(optionData);
    },
    onResize() {
      if (this.charts) this.charts.resize()
    },
  },
  watch: {
    value() {
      this.dataObj = {}
      this.dataObj = this.value
      this.initCharts()
    }
  },
  mounted () {
    this.query()
    this.$nextTick(() => {
      this.initCharts()
    })
    window.addEventListener("resize", this.onResize, false)
  },
  beforeCreate () {
  },
  beforeDestroy() {
    if (!this.chart) return
    this.chart.dispose()
    this.chart = null
    window.removeEventListener("resize", this.onResize, false)
  }
}
</script>

<style lang="less" scoped>
.echart_wrap { height: 480px;}
</style>