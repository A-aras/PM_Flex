using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NBench;
using ProjectManager.BusinessLayer;
using ProjectManager.DAL;
using ProjectManager.QualityTools;
using Unity;

namespace ProjectManager.Api.PerformanceTest
{
    public class ProjectManager_Performance_Test
    {
        private Counter perfCounter;
        private IProjectManagerService service;
        private UnityContainer container;
        private const string counterName = "PerfCounter";

        [PerfSetup]
        public void Setup(BenchmarkContext context)
        {

            container = new UnityContainer();
            container.RegisterType<IProjectManagerDbContext, ProjectManagerDbContextFake>();
            container.RegisterType<IProjectManagerService, ProjectManagerService>();
            service = container.Resolve<IProjectManagerService>();

            perfCounter = context.GetCounter(counterName);
        }

        [PerfBenchmark(RunMode = RunMode.Iterations, NumberOfIterations = 1000, TestMode = TestMode.Measurement)]
        [CounterMeasurement(counterName)]
        [TimingMeasurement()]
        [GcMeasurement(GcMetric.TotalCollections, GcGeneration.AllGc)]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void Mesure_GetUsers_ThroughPutMode()
        {
            service.GetUsers();
            perfCounter.Increment();
        }

        [PerfBenchmark(RunMode = RunMode.Throughput, RunTimeMilliseconds = 60000, TestMode = TestMode.Measurement)]
        [CounterMeasurement(counterName)]
        [TimingMeasurement()]
        [GcMeasurement(GcMetric.TotalCollections, GcGeneration.AllGc)]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void Mesure_GetUsers_IterationsMode()
        {
            service.GetUsers();
            perfCounter.Increment();
        }

        [PerfBenchmark(RunMode = RunMode.Iterations, NumberOfIterations = 1000, TestMode = TestMode.Measurement)]
        [CounterMeasurement(counterName)]
        [TimingMeasurement()]
        [GcMeasurement(GcMetric.TotalCollections, GcGeneration.AllGc)]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void Mesure_GetUserById_ThroughPutMode()
        {
            service.GetUserById(1);
            perfCounter.Increment();
        }

        [PerfBenchmark(RunMode = RunMode.Throughput, RunTimeMilliseconds = 60000, TestMode = TestMode.Measurement)]
        [CounterMeasurement(counterName)]
        [TimingMeasurement()]
        [GcMeasurement(GcMetric.TotalCollections, GcGeneration.AllGc)]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void Mesure_GetUserById_IterationsMode()
        {
            service.GetUserById(1);
            perfCounter.Increment();
        }

        [PerfCleanup]
        public void Cleanup()
        {
            service.Dispose();
            container.Dispose();
            service = null;
            container = null;
        }
    }
}
