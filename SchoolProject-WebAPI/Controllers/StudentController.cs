using System;
using Microsoft.AspNetCore.Mvc;
using SchoolProject_WebAPI.Data;
using SchoolProject_WebAPI.Models;

namespace SchoolProject_WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

    public class StudentController : ControllerBase
    {
        private readonly IRepository _repo;

        public StudentController(IRepository repo)
        {
            this._repo = repo;
            // Repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){
            try
            {
                var result = await _repo.GetAllStudentsAsync(true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetByStudentId(int studentId){
            try
            {
                var result = await _repo.GetStudentAsyncById(studentId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("BySubject/{subjectId}")]
        public async Task<IActionResult> GetBySubjectId(int subjectId)
        {
            try
            {
                var result = await _repo.GetStudentsAsyncBySubjectId(subjectId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Student model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync())
                {
                    return CreatedAtAction("Get", new { id = model.Id }, model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Error {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{studentId}")]
        public async Task<IActionResult> put(int studentId, Student model)
        {
            try
            {
                var student = await _repo.GetStudentAsyncById(studentId, false);
                if(student == null) return NotFound();

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

        [HttpDelete("{studentId}")]
        public async Task<IActionResult> delete(int studentId)
        {
            try
            {
                var student = await _repo.GetStudentAsyncById(studentId, false);
                if(student == null) return NotFound();

                _repo.Delete(student);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(new { message = "Succesfully deleted"});
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

            return BadRequest();
        }
    }
