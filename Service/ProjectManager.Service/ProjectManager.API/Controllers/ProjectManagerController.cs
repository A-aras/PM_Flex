using ProjectManager.BusinessLayer;
using ProjectManager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ProjectManager.API.Controllers
{
    public class ProjectManagerController : ApiController
    {

        private IProjectManagerService pmService;

        public ProjectManagerController(IProjectManagerService pmService)
        {
            this.pmService = pmService;
        }


        [Route("api/User/GetUsers")]
        [HttpGet]
        public ICollection<UserModel> GetUsers()
        {
            var result = pmService.GetUsers();
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/User/AddUser")]
        [ResponseType(typeof(UserModel))]
        [HttpPost]
        public IHttpActionResult AddUser(UserModel user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserModel userModel = pmService.GetUserById(user.UserId);
            if (userModel != null)
            {
                return BadRequest();
            }
            var result = pmService.AddUser(user);
            if (result != null)
            {
                return Ok();
            }
            return BadRequest();
        }

        [Route("api/User/UpdateUser")]
        [ResponseType(typeof(UserModel))]
        [HttpPost]
        public IHttpActionResult UpdateUser(UserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserModel userModel = pmService.GetUserById(user.UserId);
            if (userModel == null)
            {
                return BadRequest();
            }
            var result = pmService.UpdateUser(user);

            if (result != null)
            {
                return StatusCode(HttpStatusCode.OK);
            }
            return BadRequest();
        }

        [Route("api/User/DeleteUser/{userId:int}")]
        [ResponseType(typeof(UserModel))]
        [HttpDelete]
        public IHttpActionResult DeleteUser(int userId)
        {
            UserModel userModel = pmService.GetUserById(userId);
            if (userModel == null)
            {
                return NotFound();
            }
            var result = pmService.DeleteUser(userModel);

            if (result)
            {
                return Ok(userModel);
            }
            return BadRequest();
        }

        [Route("api/Project/GetProjects")]
        [HttpGet]
        public ICollection<ProjectModel> GetProjects()
        {
            var result = pmService.GetProjects();
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/Project/AddProject")]
        [ResponseType(typeof(UserModel))]
        [HttpPost]
        public IHttpActionResult AddProject(ProjectModel project)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectModel proj = pmService.GetProjectById(project.ProjectId);
            if (proj != null)
            {
                return BadRequest();
            }
            var result = pmService.AddProject(project);
            if (result != null)
            {
                return Ok();
            }
            return BadRequest();
        }


        [Route("api/Project/UpdateProject")]
        [ResponseType(typeof(UserModel))]
        [HttpPost]
        public IHttpActionResult UpdateProject(ProjectModel project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //UserModel userModel = pmService.GetUserById(user.UserId);
            //if (userModel == null)
            //{
            //    return BadRequest();
            //}
            var result = pmService.UpdateProject(project);

            if (result != null)
            {
                return StatusCode(HttpStatusCode.OK);
            }
            return BadRequest();
        }

        [Route("api/Task/GetTasks")]
        [HttpGet]
        public ICollection<TaskModel> GeTasks()
        {
            var result = pmService.GetTasks();
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/Task/GetParentTasksForProject")]
        [HttpGet]
        public ICollection<TaskModel> GetParentTasksForProject([FromUri]ProjectModel query)
        {
            var result = pmService.GetParentTasksForProject(query);
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/Task/GetAllTaskForProject")]
        [HttpGet]
        public ICollection<TaskModel> GetAllTaskForProject([FromUri]ProjectModel query)
        {
            var result = pmService.GetAllTaskForProject(query);
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/Task/GetParentTasks")]
        [HttpGet]
        public ICollection<TaskModel> GetParentTasks()
        {
            var result = pmService.GetParentTasks();
            Console.WriteLine(result.ToString());
            return result;
        }

        [Route("api/Task/AddTask")]
        [ResponseType(typeof(TaskModel))]
        [HttpPost]
        public IHttpActionResult AddTask(TaskModel task)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TaskModel oldTaskModel = pmService.GetTaskById(task.TaskId);
            if (oldTaskModel != null)
            {
                return BadRequest();
            }
            var result = pmService.AddTask(task);
            if (result != null)
            {
                return Ok();
            }
            return BadRequest();
        }


        [Route("api/Task/UpdateTask")]
        [ResponseType(typeof(TaskModel))]
        [HttpPost]
        public IHttpActionResult UpdateTask(TaskModel task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //UserModel userModel = pmService.GetUserById(user.UserId);
            //if (userModel == null)
            //{
            //    return BadRequest();
            //}
            var result = pmService.UpdateTaks(task);

            if (result != null)
            {
                return StatusCode(HttpStatusCode.OK);
            }
            return BadRequest();
        }


        [Route("api/Task/GetTaskById/{taskId:int}")]
        [HttpGet]
        public TaskModel GetTaskById(int taskId)
        {

            var result = pmService.GetTaskById(taskId);
            Console.WriteLine(result.ToString());
            return result;
        }

    }
}
