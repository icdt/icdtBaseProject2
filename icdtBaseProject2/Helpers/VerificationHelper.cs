using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Helpers
{
    public static class VerificationHelper
    {
        public static string CreateVerificationText(int length)
        {
            char[] _verification = new char[length];
            char[] _dictionary = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7', '8', '9' };
            Random _random = new Random();
            for (int i = 0; i < length; i++) { _verification[i] = _dictionary[_random.Next(_dictionary.Length - 1)]; }
            return new string(_verification);
        }

        public static Bitmap CreateVerificationImage(string verificationText, int width, int height)
        {
            Pen _pen = new Pen(Color.Black);
            Font _font = new Font("Arial", 14, FontStyle.Bold);
            Brush _brush = null;
            Bitmap _bitmap = new Bitmap(width, height);
            Graphics _g = Graphics.FromImage(_bitmap);
            SizeF _totalSizeF = _g.MeasureString(verificationText, _font);
            SizeF _curCharSizeF;
            PointF _startPointF = new PointF(((width - _totalSizeF.Width) / 2) - 20, (height - _totalSizeF.Height) / 2);

            Random _random = new Random();
            _g.Clear(Color.White);
            for (int i = 0; i < verificationText.Length; i++)
            {
                _brush = new LinearGradientBrush(new Point(0, 0), new Point(1, 1), Color.FromArgb(_random.Next(255), _random.Next(255), _random.Next(255)), Color.FromArgb(_random.Next(255), _random.Next(255), _random.Next(255)));
                _g.DrawString(verificationText[i].ToString(), _font, _brush, _startPointF);
                _curCharSizeF = _g.MeasureString(verificationText[i].ToString(), _font);
                _startPointF.X += _curCharSizeF.Width;
            }
            _g.Dispose();
            return _bitmap;
        }


        #region Google Validate
        private const string secretKey = "6Lf9WQcTAAAAACoKdNVFJw2_niZksPeGxEudc-4q";
        public static CaptchaResponse IsGoogleAccess(HttpRequestBase req)
        {
            var res = req["g-recaptcha-response"];
            return IsGoogleAccess(res);
        }
        public static CaptchaResponse IsGoogleAccess(string req)
        {
            var result = CommunicateGoogle(req, secretKey);
            return result;
        }
        private static CaptchaResponse CommunicateGoogle(string res, string secretaryKey)
        {
            var client = new System.Net.WebClient();
            var reply =
                client.DownloadString(
                    string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, res));

            var captchaResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<CaptchaResponse>(reply);
            return captchaResponse;
        }
        #endregion
    }
    //<form action="/home/validatecaptcha" method="POST">
    //        <div class="g-recaptcha" data-sitekey="6Lf9WQcTAAAAAAQdIP07sHDmShW6IB2w4pealklT"></div>
    //        <input type="submit" value="Submit">
    //    </form>
    //<script src='https://www.google.com/recaptcha/api.js'></script>
    public class CaptchaResponse
    {
        [Newtonsoft.Json.JsonProperty("success")]
        public bool Success { get; set; }

        [Newtonsoft.Json.JsonProperty("error-codes")]
        public List<string> ErrorCodes { get; set; }
    }
}