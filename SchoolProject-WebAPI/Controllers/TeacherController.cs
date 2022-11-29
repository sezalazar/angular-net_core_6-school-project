using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SchoolProject_WebAPI.Data;
using SchoolProject_WebAPI.Models;

namespace SchoolProject_WebAPI.Controllers;
[ApiController]
[Route("api/[controller]")]

    public class TeacherController : ControllerBase
    {
        private readonly IRepository _repo;

        public TeacherController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){
            try
            {
                var result = await _repo.GetAllTeachersAsync(true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("{teacherId}")]
        public async Task<IActionResult> GetByTeacherId(int teacherId){
            try
            {
                var result = await _repo.GetTeacherAsyncById(teacherId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ByStudent/{studentId}")]
        public async Task<IActionResult> GetBySubjectId(int studentId)
        {
            try
            {
                var result = await _repo.GetTeachersAsyncByStudentId(studentId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Teacher model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync())
                {
                    // return Ok(model);
                    return CreatedAtAction("Get", new { id = model.Id }, model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

            return BadRequest();
        }

        
        [HttpPut("{teacherId}")]
        public async Task<IActionResult> put(int teacherId, Teacher model)
        {
            try
            {
                var teacher = await _repo.GetTeacherAsyncById(teacherId, false);
                if(teacher == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{teacherId}")]
        public async Task<IActionResult> delete(int teacherId)
        {
            try
            {
                var teacher = await _repo.GetTeacherAsyncById(teacherId, false);
                if(teacher == null) return NotFound();

                _repo.Delete(teacher);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok("Succesfully deleted");
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

            return BadRequest();
        }
        
    }
